const express = require('express');

const router = express.Router();
const _ = require('lodash');

const {
  DateTime,
} = require('luxon');

module.exports = (app) => {
  /**
   * @api {get} /ban/:steamId Request ban information
   * @apiName GetBan
   * @apiGroup Ban
   *
   * @apiParam {Number} id Steam64 ID
   *
   * @apiSuccess {Object[]} bans List of bans for a player.
   * @apiSuccess {String}   bans.id UUID
   * @apiSuccess {Date}   bans.bannedUntil Date when the ban expires
   * @apiSuccess {Enum} bans.status active, elapsed or deleted
   * @apiSuccess {boolean} bans.verified
   * @apiSuccess {Object} bans.game
   * @apiSuccess {Number} bans.game.id Integer ID
   * @apiSuccess {String} bans.game.code short code for identifying the game
   * @apiSuccess {String} bans.game.fullName full game name
   * @apiSuccess {Object} bans.reason
   * @apiSuccess {Number} bans.reason.id Integer ID
   * @apiSuccess {String} bans.reason.reasonShort Short name of the reason
   * @apiSuccess {String} bans.reason.reasonLong Long description of the reason
   * @apiSuccess {Object} bans.player
   * @apiSuccess {String} bans.player.id UUID
   * @apiSuccess {String} bans.player.steamId Steam64 ID
   * @apiSuccess {String} bans.player.username Name of the player
   * @apiSuccess {Object} bans.server Which server this ban belongs to
   * @apiSuccess {String} bans.server.id UUID
   * @apiSuccess {String} bans.server.name name of the server
   *
   * @apiSuccessExample Success-Response:
   *     HTTP/1.1 200 OK
   *[
   *    {
   *        "id": "0a40cf80-4b2a-11e9-a532-07f768aa6c74",
   *        "bannedUntil": "2020-01-27T18:27:34.000Z",
   *        "status": "active",
   *        "verified": false,
   *        "createdAt": "2019-03-20T16:05:54.000Z",
   *        "updatedAt": "2019-03-20T16:05:54.000Z",
   *        "game": {
   *            "id": 2,
   *            "code": "rust",
   *            "fullName": "Rust",
   *        },
   *        "reason": {
   *            "id": 3,
   *            "reasonShort": "Other",
   *            "reasonLong": "General reason when the defaults do not cover the actual reason of the ban.",
   *        },
   *        "player": {
   *            "id": "0a3fe520-4b2a-11e9-a532-07f768aa6c74",
   *            "steamId": "78956",
   *            "username": "Justice.Denesik",
   *        },
   *        "server": {
   *            "id": "0a3e1060-4b2a-11e9-a532-07f768aa6c74",
   *            "name": "Gleason, Zieme and Ratke",
   *        }
   *    },
   *    {
   *        "id": "0a929900-4b2a-11e9-a532-07f768aa6c74",
   *        "bannedUntil": "2020-03-11T03:15:53.000Z",
   *        "status": "active",
   *        "verified": false,
   *        "game": {
   *            "id": 1,
   *            "code": "7d2d",
   *            "fullName": "7 Days to Die",
   *        },
   *        "reason": {
   *            "id": 3,
   *            "reasonShort": "Other",
   *            "reasonLong": "General reason when the defaults do not cover the actual reason of the ban.",
   *        },
   *        "player": {
   *            "id": "0a913970-4b2a-11e9-a532-07f768aa6c74",
   *            "steamId": "76561198028175941",
   *            "username": "Catalysm",
   *        },
   *        "server": {
   *            "id": "0a3e1060-4b2a-11e9-a532-07f768aa6c74",
   *            "name": "Gleason, Zieme and Ratke",
   *        }
   *    }
   *]
   */
  router.get('/', async (req, res, next) => {
    const {
      steamId,
    } = req.query;

    let bans;

    if (!_.isEmpty(steamId)) {
      const player = await app.models.Player.findOne({
        where: {
          steamId,
        },
      });
      if (_.isNull(player)) {
        res.status(404);
        return next('Unknown steamId')
      }
      bans = await app.models.Ban.findAll({
        where: {
          PlayerId: player.id,
        },
        include: [app.models.Player, app.models.Game, app.models.Server, app.models.Reason],
      });
    } else {
      bans = await app.models.Ban.findAll({
        include: [app.models.Player, app.models.Game, app.models.Server, app.models.Reason],
      });
    }

    bans = bans.map(b => ({
      id: b.id,
      bannedUntil: b.bannedUntil,
      status: b.status,
      verified: b.verified,
      createdAt: b.createdAt,
      updatedAt: b.updatedAt,
      game: b.Game,
      reason: b.Reason,
      player: b.Player,
      server: b.Server,
    }));
    res.send(bans);
    res.end();
  });


  // GET one ban by id
  app.get('/ban/:id', (req, res) => {
    const {
      id,
    } = req.params;
    return app.models.Ban.findByPk(id)
      .then((ban) => {
        if (ban === null) {
          res.status(404);
          return res.end();
        }
        return res.json(ban);
      });
  });

  /* POST ban listing. */
  router.post('/', async (req, res, next) => {
    if (req.body.bannedUntil === undefined) {
      res.status(400);
      res.send('bannedUntil is required.');
      return res.end();
    }

    if (req.body.steamId === undefined) {
      res.status(400);
      res.send('steamId is required.');
      return res.end();
    }

    const {
      bannedUntil,
      steamId,
    } = req.body;

    const bannedUntilDate = DateTime.fromISO(bannedUntil);
    const playerProfiles = await app.helpers.getSteamProfiles([steamId]);

    if (!bannedUntilDate.isValid) {
      res.status(400);
      res.send('bannedUntil must be in ISO 8601 format.');
      return res.end();
    }

    const dateNow = Date.now();

    if (bannedUntilDate.toMillis() < dateNow) {
      res.status(400);
      res.send('bannedUntil must be in the future.');
      return res.end();
    }

    let isValidReason = false;
    let ReasonId;
    app.supportedReasons.forEach((r) => {
      if (req.body.reason === r.reasonShort) {
        isValidReason = true;
        ReasonId = r.id;
      }
    });

    if (!isValidReason) {
      res.status(400);
      res.send(`Reason must be one of: ${app.supportedReasons.map(r => r.reasonShort).join(', ')}`);
      return res.end();
    }

    let isValidGame = false;
    let GameId;
    app.supportedGames.forEach((game) => {
      if (req.body.game === game.code) {
        isValidGame = true;
        GameId = game.id;
      }
    });

    if (!isValidGame) {
      res.status(400);
      res.send(`Game must be one of: ${app.supportedGames.map(game => game.code).join(', ')}`);
      return res.end();
    }

    if (playerProfiles.length === 0) {
      res.send(`Invalid steam ID provided: ${req.body.steamId}`);
      return res.end();
    }


    return app.models.Ban.create({
      bannedUntil,
      ReasonId,
      GameId,
      PlayerId: playerProfiles[0].id,
    }).then((newBan) => {
      res.send(newBan);
    }).catch((e) => {
      next(e);
    });
  });

  return router;
};
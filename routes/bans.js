const express = require('express');

const router = express.Router();

const {
  DateTime,
} = require('luxon');

module.exports = (app) => {
  /* GET bans listing. */
  router.get('/', (req, res) => {
    app.models.Ban.findAll().then((bans) => {
      res.send(bans);
    });
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
/* eslint-disable max-len */
const _ = require('lodash');

/**
 * @api {get} /api/ban GET /api/ban
 * @apiName GET /api/ban
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

module.exports = function searchBans(app) {
  app.get('/api/ban', async (req, res, next) => {
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
        return next('Unknown steamId');
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
    return res.end();
  });
};

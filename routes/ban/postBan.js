const {
  DateTime,
} = require('luxon');
const _ = require('lodash');
/**
 * 
 * @api {POST} /ban POST /ban
 * @apiName PostBan
 * @apiGroup Ban
 * 
 * 
 * @apiParam  {String} bannedUntil ISO DateTime
 * @apiParam  {String} steamId Steam64 ID
 * 
 * @apiSuccess (200) {Object} ban The newly created ban
 * @apiSuccess {String}   ban.id UUID
 * @apiSuccess {Date}   ban.bannedUntil Date when the ban expires
 * @apiSuccess {Enum} ban.status active, elapsed or deleted
 * @apiSuccess {boolean} ban.verified
 * 
 * @apiParamExample  {type} Request-Example:
 * {
 *     "bannedUntil": "2019-05-15T08:30:00",
 *     "steamId": "76561198028175941",
 *     "reason": "other",
 *     "game": "7d2d"
 * }
 * 
 * 
 * @apiSuccessExample {type} Success-Response:
 * {
 *     "id": "f151e930-4c07-11e9-a3be-61e864bef7f5",
 *     "bannedUntil": "2019-05-15T06:30:00.000Z",
 *     "status": "active",
 *     "verified": false,
 *     "createdAt": "2019-03-21T18:34:20.868Z",
 *     "updatedAt": "2019-03-21T18:34:20.868Z"
 * }
 * 
 * 
 */

module.exports = function postBan(app) {
  app.post('/ban', async (req, res, next) => {
    if (_.isEmpty(req.body)) {
      res.status(400);
      res.send('Empty body.');
      return res.end();
    }

    const {
      bannedUntil,
      steamId,
      reason,
      game
    } = req.body;

    if (_.isEmpty(bannedUntil)) {
      res.status(400);
      res.send('bannedUntil is required.');
      return res.end();
    }

    if (_.isEmpty(steamId)) {
      res.status(400);
      res.send('steamId is required.');
      return res.end();
    }

    if (_.isEmpty(reason)) {
      res.status(400);
      res.send('reason is required.');
      return res.end();
    }

    if (_.isEmpty(game)) {
      res.status(400);
      res.send('game is required.');
      return res.end();
    }

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
      if (reason.toLowerCase() === r.reasonShort.toLowerCase()) {
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
      if (req.body.game.toLowerCase() === game.code.toLowerCase()) {
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
      let response = {
        id: newBan.id,
        bannedUntil: newBan.bannedUntil,
        status: newBan.status,
        verified: newBan.verified,
        createdAt: newBan.createdAt,
        updatedAt: newBan.updatedAt,
      };
      res.send(response);
    }).catch((e) => {
      next(e);
    });
  });
}
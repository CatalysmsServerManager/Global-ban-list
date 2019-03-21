/**
 * 
 * @api {GET} /ban/:id GET /ban/:id
 * @apiName GET /ban/:id
 * @apiGroup Ban
 * 
 * 
 * @apiParam  {String} banId UUID of the ban to get
 * 
 * @apiSuccess {Object} ban
 * @apiSuccess {String}   ban.id UUID
 * @apiSuccess {Date}   ban.bannedUntil Date when the ban expires
 * @apiSuccess {Enum} ban.status active, elapsed or deleted
 * @apiSuccess {boolean} ban.verified
 * @apiSuccess {Object} ban.game
 * @apiSuccess {Number} ban.game.id Integer ID
 * @apiSuccess {String} ban.game.code short code for identifying the game
 * @apiSuccess {String} ban.game.fullName full game name
 * @apiSuccess {Object} ban.reason
 * @apiSuccess {Number} ban.reason.id Integer ID
 * @apiSuccess {String} ban.reason.reasonShort Short name of the reason
 * @apiSuccess {String} ban.reason.reasonLong Long description of the reason
 * @apiSuccess {Object} ban.player
 * @apiSuccess {String} ban.player.id UUID
 * @apiSuccess {String} ban.player.steamId Steam64 ID
 * @apiSuccess {String} ban.player.username Name of the player
 * @apiSuccess {Object} ban.server Which server this ban belongs to
 * @apiSuccess {String} ban.server.id UUID
 * @apiSuccess {String} ban.server.name name of the server
 * 
 * @apiParamExample  {String} Request-Example:
 * {
 *     "id" : "0a40cf80-4b2a-11e9-a532-07f768aa6c74"
 * }
 * 
 * 
 * @apiSuccessExample {Object} Success-Response:
 *{
 *    "id": "0a40cf80-4b2a-11e9-a532-07f768aa6c74",
 *    "bannedUntil": "2020-01-27T18:27:34.000Z",
 *    "status": "active",
 *    "verified": false,
 *    "createdAt": "2019-03-20T16:05:54.000Z",
 *    "updatedAt": "2019-03-20T16:05:54.000Z",
 *    "game": {
 *        "id": 2,
 *        "code": "rust",
 *        "fullName": "Rust",
 *        "createdAt": "2019-03-20T17:05:48.000Z",
 *        "updatedAt": "2019-03-20T17:05:48.000Z"
 *    },
 *    "reason": {
 *        "id": 3,
 *        "reasonShort": "Other",
 *        "reasonLong": "General reason when the defaults do not cover the actual reason of the ban.",
 *        "createdAt": "2019-03-20T17:05:48.000Z",
 *        "updatedAt": "2019-03-20T17:05:48.000Z"
 *    },
 *    "player": {
 *        "id": "0a3fe520-4b2a-11e9-a532-07f768aa6c74",
 *        "steamId": "78956",
 *        "username": "Justice.Denesik",
 *        "createdAt": "2019-03-20T16:05:54.000Z",
 *        "updatedAt": "2019-03-20T16:05:54.000Z",
 *        "UserId": "0a3f21d0-4b2a-11e9-a532-07f768aa6c74"
 *    },
 *    "server": {
 *        "id": "0a3e1060-4b2a-11e9-a532-07f768aa6c74",
 *        "name": "Gleason, Zieme and Ratke",
 *        "createdAt": "2019-03-20T16:05:54.000Z",
 *        "updatedAt": "2019-03-20T16:05:54.000Z",
 *        "ownedById": "0a3bed80-4b2a-11e9-a532-07f768aa6c74"
 *    }
 *}
 * 
 * 
 */

module.exports = function getBanById(app) {
  app.get('/ban/:id', (req, res) => {
    const {
      id,
    } = req.params;
    return app.models.Ban.findByPk(id, {
        include: [app.models.Player, app.models.Game, app.models.Server, app.models.Reason],
      })
      .then((ban) => {
        if (ban === null) {
          res.status(404);
          return res.end();
        }
        let response = {
          id: ban.id,
          bannedUntil: ban.bannedUntil,
          status: ban.status,
          verified: ban.verified,
          createdAt: ban.createdAt,
          updatedAt: ban.updatedAt,
          game: ban.Game,
          reason: ban.Reason,
          player: ban.Player,
          server: ban.Server,
        };
        return res.json(response);
      });
  });
}
/* eslint-disable max-len */
/**
 *
 * @api {GET} /api/user/:id GET /api/user/:id
 * @apiName GET /api/user/:id
 * @apiGroup User
 *
 *
 * @apiParam  {String} userId UUID of the user to get
 *
 * @apiSuccess {Object} user
 * @apiSuccess {String} user.id UUID
 * @apiSuccess {String} user.username Username
 * @apiSuccess {String} user.steamId Steam64 ID
 * @apiSuccess {Date} user.lastVisited Date the user was last active on the website
 *
 * @apiParamExample  {String} Request-Example:
 * {
 *     "id" : "0a40cf80-4b2a-11e9-a532-07f768aa6c74"
 * }
 *
 */

module.exports = function getUserById(app) {
  app.get('/api/user/:id', (req, res) => {
    const {
      id,
    } = req.params;
    return app.models.User.findByPk(id)
      .then((user) => {
        if (user === null) {
          res.status(404);
          return res.end();
        }
        const userData = user.get({
          plain: true,
        });
        const response = {
          id: userData.id,
          username: userData.username,
          steamId: userData.steamId,
          lastVisited: userData.lastVisited,
        };
        return res.json(response);
      });
  });
};

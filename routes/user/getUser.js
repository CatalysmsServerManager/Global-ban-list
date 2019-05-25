const isAuthenticated = require('../../helpers/isAuthenticated');

module.exports = function getBanById(app) {
  app.get('/api/user/:id', isAuthenticated, (req, res) => {
    const {
      id,
    } = req.params;
    return app.models.user.findByPk(id)
      .then((user) => {
        if (user === null) {
          res.status(404);
          return res.end();
        }
        const response = {
          id: user.id,
          username: user.username,
          steamId: user.steamId,
          lastVisited: user.lastVisited,
        };
        return res.json(response);
      });
  });
};

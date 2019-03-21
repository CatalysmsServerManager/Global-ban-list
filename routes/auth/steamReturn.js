const passport = require('passport');
/**
 * @api {GET} /auth/steam/return GET /auth/steam/return
 * @apiName Steam authentication return
 * @apiGroup Authentication
 * @apiDescription Return after authentication via steam
 */
module.exports = function steamAuthReturn(app) {
  app.get('/auth/steam/return',
    passport.authenticate('steam', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};

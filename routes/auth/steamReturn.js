const passport = require('passport');

module.exports = function steamAuth(app) {
  app.get('/auth/steam/return',
    passport.authenticate('steam', {
      failureRedirect: '/login',
    }),
    (req, res) => {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
};

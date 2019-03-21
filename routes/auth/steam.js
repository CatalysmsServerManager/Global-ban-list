const passport = require('passport');

module.exports = function steamAuth(app) {
  app.get('/auth/steam', passport.authenticate('steam'), () => {

  });
};

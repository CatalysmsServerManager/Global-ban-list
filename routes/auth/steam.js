const passport = require('passport');
/**
 * @api {GET} /auth/steam GET /auth/steam
 * @apiName Steam authentication
 * @apiGroup Authentication
 * @apiDescription Will redirect to steam OpenID authentication
 */
module.exports = function steamAuth(app) {
  app.get('/auth/steam', passport.authenticate('steam'), () => {

  });
};

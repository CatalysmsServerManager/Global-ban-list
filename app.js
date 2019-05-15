// Load environment config variables
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const session = require("express-session");
const path = require('path');
const expressLogger = require('morgan');
const fs = require('fs');
const bodyParser = require('body-parser');
const Passport = require('passport');
const PassportSteam = require('passport-steam');
const logger = require('./lib/logger');

const app = express();
app.use(session({ secret: process.env.SESSION_SECRET }));

// Initialize database connection
app.models = require('./models');

app.models.sequelize.sync().then(() => {
  logger.info('Finished database initialization');
  app.models.Game.findAll().then((games) => {
    const supportedGames = games.map(game => game.dataValues);
    app.supportedGames = supportedGames;
    logger.info(`Initialized ${supportedGames.length} supported games. ${supportedGames.map(game => game.fullName).join(', ')}`);
  });

  app.models.Reason.findAll().then((reasons) => {
    const supportedReasons = reasons.map(reason => reason.dataValues);
    app.supportedReasons = supportedReasons;
    logger.info(`Initialized ${supportedReasons.length} supported reasons. ${supportedReasons.map(reason => reason.reasonShort).join(', ')}`);
  });
});

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV !== 'test') {
  app.use(expressLogger(':method :url :status :res[content-length] - :response-time ms', { stream: logger.stream }));
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(Passport.initialize());
app.use(Passport.session());

Passport.serializeUser((user, done) => {
  logger.info(`Serialized user ${user.id}`);
  done(null, user.id);
});

Passport.deserializeUser((id, done) => {
  app.models.User.findByPk(id).then(result => {
    logger.info(`Deserialized user ${result.id}`);
    done(null, result);
  }).catch(e => {
    done(e)
  })

});

Passport.use(new PassportSteam({
  returnURL: `${process.env.HOSTNAME}/auth/steam/return`,
  realm: process.env.HOSTNAME,
  apiKey: process.env.STEAM_API_KEY,
},
  (async (identifier, profile, done) => {
    const {
      steamid,
      personaname,
      // eslint-disable-next-line no-underscore-dangle
    } = profile._json;
    try {
      let user = await app.models.User.findOrCreate({
        where: {
          steamId: steamid,
        },
        defaults: {
          username: personaname,
          steamId: steamid,
        },
      });
      if (user[1]) {
        logger.info(`New user registered via steam ${steamid}`);
      }
      user = user[0].get({ plain: true });
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  })));

require('./routes')(app);
// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404, 'This page does not exist.'));
});

// error handler
app.use((err, req, res) => {
  logger.error(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Register helper functions
app.helpers = {};
fs
  .readdirSync(`${__dirname}/helpers`)
  .filter(file => (file.indexOf('.') !== 0) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const helper = require(`${__dirname}/helpers/${file}`); // eslint-disable-line
    // Bind models to the helper function so we can access them
    const boundHelper = helper.bind(helper, app.models);
    app.helpers[file.replace('.js', '')] = boundHelper;
  });

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

module.exports = app;

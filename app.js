// Load environment config variables
require('dotenv').config();

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');


const app = express();

// Initialize database connection
app.models = require('./models');

app.models.sequelize.sync();

// Create default reason values
app.models.Reason.findOrCreate({
  where: {
    reasonShort: 'Hacking',
    reasonLong: 'User has used external tools to gain an unfair advantage in the game.',
  },
});

app.models.Reason.findOrCreate({
  where: {
    reasonShort: 'Racism',
    reasonLong: 'User has said racial slurs.',
  },
});

app.models.Reason.findOrCreate({
  where: {
    reasonShort: 'Other',
    reasonLong: 'General reason when the defaults do not cover the actual reason of the ban.',
  },
});

const usersRouter = require('./routes/users')(app);
const bansRouter = require('./routes/bans')(app);
const pagesRouter = require('./routes/pages')(app);

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}

app.use(express.json());
app.use(express.urlencoded({
  extended: false,
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', pagesRouter);
app.use('/user', usersRouter);
app.use('/ban', bansRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res) => {
  console.log(err);
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

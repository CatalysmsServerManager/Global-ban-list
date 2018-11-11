const express = require('express');

const router = express.Router();

module.exports = (app) => { // eslint-disable-line no-unused-vars
  router.get('/', (req, res) => {
    res.render('index', {});
  });

  router.get('/bans', (req, res) => {
    res.render('bans', {});
  });

  return router;
};

const express = require('express');

const router = express.Router();

module.exports = (app) => { // eslint-disable-line no-unused-vars
  /* GET home page. */
  router.get('/', (req, res) => {
    res.render('index', {
      title: 'Global ban list',
    });
  });
  return router;
};

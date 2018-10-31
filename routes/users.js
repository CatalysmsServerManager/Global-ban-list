const express = require('express');

const router = express.Router();

module.exports = (app) => { // eslint-disable-line no-unused-vars
  /* GET users listing. */
  router.get('/', (req, res) => {
    res.send('respond with a resource');
  });

  return router;
};

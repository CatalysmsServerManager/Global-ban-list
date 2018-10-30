const express = require('express');

const router = express.Router();
const models = require('../models');

/* GET bans listing. */
router.get('/', (req, res) => {
  models.Ban.findAll().then((bans) => {
    res.send(bans);
  });
});

module.exports = router;

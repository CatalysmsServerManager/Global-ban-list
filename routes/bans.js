var express = require('express');
var router = express.Router();
var models = require("../models");

/* GET bans listing. */
router.get('/', function (req, res, next) {

    models.Ban.findAll().then(bans => {
        res.send(bans);
    })

});

module.exports = router;
const express = require('express');

const router = express.Router();

const {
  DateTime,
} = require('luxon');

module.exports = (app) => {
  /* GET bans listing. */
  router.get('/', (req, res) => {
    app.models.Ban.findAll().then((bans) => {
      res.send(bans);
    });
  });

  // GET one ban by id
  app.get('/ban/:id', (req, res) => {
    const {
      id,
    } = req.params;
    return app.models.Ban.findByPk(id)
      .then((ban) => {
        if (ban === null) {
          res.status(404);
          return res.end();
        }
        return res.json(ban);
      });
  });

  /* POST ban listing. */
  router.post('/', (req, res) => {
    if (req.body.bannedUntil === undefined) {
      res.status(400);
      res.send('bannedUntil is required.');
      return res.end();
    }

    const bannedUntil = DateTime.fromISO(req.body.bannedUntil);


    if (!bannedUntil.isValid) {
      res.status(400);
      res.send('bannedUntil must be in ISO 8601 format.');
      return res.end();
    }

    const dateNow = Date.now();

    if (bannedUntil.toMillis() < dateNow) {
      res.status(400);
      res.send('bannedUntil must be in the future.');
      return res.end();
    }

    let isValidReason = false;
    const acceptedReasons = app.models.Ban.attributes.reason.values;

    acceptedReasons.forEach((r) => {
      if (req.body.reason === r) {
        isValidReason = true;
      }
    });


    if (!isValidReason) {
      res.status(400);
      res.send(`Reason must be one of: ${acceptedReasons.join(', ')}`);
      return res.end();
    }

    return app.models.Ban.create({
      bannedUntil: req.body.bannedUntil,
      reason: req.body.reason,
    }).then((newBan) => {
      res.send(newBan);
    });
  });

  return router;
};

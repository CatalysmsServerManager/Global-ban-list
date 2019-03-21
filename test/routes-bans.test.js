// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

const mock = require('./mock');

// Start the server
const server = require('../bin/www');

const validSteamId = '76561198028175941';
const should = chai.should(); // eslint-disable-line no-unused-vars

const {
  reasons,
  games,
} = require('../config/constants');

const {
  sequelize,
} = require('../models');

chai.use(chaiHttp);


describe('API v1 - Ban', () => {
  describe('GET /ban', () => {
    let mockPlayer;
    before(async () => {
      const player = await mock.player();
      const ban = await mock.ban(undefined, player.get({plain:true}).id);
      mockPlayer = player.get({plain:true});
      return;
    });
    it('it should GET all the bans', (done) => {
      chai.request(server)
        .get('/ban')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it('it should find bans based on steamId', (done) => {
      chai.request(server)
        .get(`/ban?steamId=${mockPlayer.steamId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });
    it('it returns 404 when unknown steamId is given', (done) => {
      chai.request(server)
        .get(`/ban?steamId=notavalidId`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /ban/:id', () => {
    let createdBan;

    before(async () => {
      createdBan = await mock.ban();
    });

    it('it should return 200 for a valid ID.', (done) => {
      chai.request(server)
        .get(`/ban/${createdBan.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.be.equal(createdBan.id);
          done();
        });
    });

    it('it should return 404 for a unknown ID.', (done) => {
      chai.request(server)
        .get(`/ban/${createdBan.id + 250}`)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('POST /ban', () => {
    it('it should return 200 when correct data is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          reason: 'Other',
          steamId: validSteamId,
          game: '7d2d',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should return 400 when a bannedUntil that is not a date is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: 'not a date',
          reason: 'other',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when an empty bannedUntil is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          reason: 'other',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when no parameters are given', (done) => {
      chai.request(server)
        .post('/ban')
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when a invalid reason flag is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          reason: 'being a nice person :)',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when no reason is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          steamId: validSteamId,
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when no game is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          steamId: validSteamId,
          reason: 'other',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when an invalid bannedUntil is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          reason: 'other',
          steamId: validSteamId,
          game: '7d2d',
          bannedUntil: 'qsjfpqgpqg',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when a bannedUntil in the past is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.past(4),
          reason: 'other',
          steamId: validSteamId,
          game: '7d2d',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when an invalid reason is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          reason: 'sfqfqsfqs',
          steamId: validSteamId,
          game: '7d2d',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when an invalid game is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          reason: 'other',
          steamId: validSteamId,
          game: 'sqfqgqgz',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
    it('it should return 400 when an invalid steam ID is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.future(),
          reason: 'other',
          steamId: 'makeItInvalid',
          game: '7d2d',
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });
});
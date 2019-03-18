// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const faker = require('faker');
const chai = require('chai');
const chaiHttp = require('chai-http');

const mock = require('./mock');

// Start the server
const server = require('../bin/www');

const should = chai.should(); // eslint-disable-line no-unused-vars

const {
  reasons,
  games,
} = require('../config/constants')

const {
  sequelize,
} = require('../models');

chai.use(chaiHttp);


describe('API v1 - Ban', () => {
  before(async () => {
    await sequelize.sync();
  });

  describe('GET /ban', () => {
    it('it should GET all the bans', (done) => {
      chai.request(server)
        .get('/ban')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
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
          steamId: '76561198028175941', // Hard coded valid steam ID to pass validation
          game: '7d2d',
        })
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
    it('it should return 400 when a bannedUntil in the past is given', (done) => {
      chai.request(server)
        .post('/ban')
        .send({
          bannedUntil: faker.date.past(),
          reason: 'other',
        })
        .end((err, res) => {
          res.should.have.status(400);
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
  });
});
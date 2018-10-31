// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();

const faker = require('faker');
const {
  sequelize
} = require('../models');

chai.use(chaiHttp);

describe('API v1 - Ban', () => {


  before(async () => {
    await sequelize.sync({
      force: true
    });
  });

  describe('GET /ban', () => {
    it('it should GET all the bans', (done) => {
      chai.request(server)
        .get('/ban')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.be.eql(0);
          done();
        });
    });
  });

  describe('GET /ban/:id', () => {

    let createdBan;

    before(async () => {
      createdBan = await mockBan();
    })

    it('it should return 200 for a valid ID.', (done) => {
      chai.request(server)
        .get(`/ban/${createdBan.id}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.id.should.be.equal(createdBan.id)
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
          reason: 'other'
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
          reason: 'other'
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
          bannedUntil: "not a date",
          reason: 'other'
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
          reason: 'other'
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
          reason: 'being a nice person :)'
        })
        .end((err, res) => {
          res.should.have.status(400);
          done();
        });
    });
  });


});


const acceptedReasons = sequelize.models.Ban.attributes.reason.values;

function mockBan() {

  let ban = {
    bannedUntil: faker.date.future(),
    reason: acceptedReasons[Math.floor(Math.random() * acceptedReasons.length)]
  }

  return sequelize.models.Ban.create(ban)

}
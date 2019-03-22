// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const mock = require('../mock');

// Start the server
const server = require('../../bin/www');

const should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('GET /api/user/:id', () => {
  let testUser;
  before(async () => {
    testUser = await mock.user();
  });

  it('Returns 200 and expected data', (done) => {
    chai.request(server)
      .get(`/api/user/${testUser.id}`)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.id.should.be.eq(testUser.id);
        done();
      });
  });

  it('Returns 404 for unknown ID', (done) => {
    chai.request(server)
      .get('/api/user/unknownId')
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });
});
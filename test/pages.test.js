// During the test the env variable is set to test
process.env.NODE_ENV = 'test';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');

// Start the server
const server = require('../bin/www');

const should = chai.should(); // eslint-disable-line no-unused-vars

chai.use(chaiHttp);

describe('Pages', () => {
  describe('GET /', () => {

    it('it loads the homepage', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });


  });

});
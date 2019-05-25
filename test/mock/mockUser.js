const faker = require('faker');
const _ = require('lodash');

const {
  sequelize,
} = require('../../models');

module.exports = function mockServer(username, steamId) {
  if (_.isUndefined(username)) {
    username = faker.internet.userName();
  }

  if (_.isUndefined(steamId)) {
    steamId = faker.random.number();
  }

  const user = {
    username,
    steamId,
  };

  return sequelize.models.user.create(user);
};

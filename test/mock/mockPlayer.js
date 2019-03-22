const faker = require('faker');
const _ = require('lodash');
const MockUser = require('./mockUser');

const {
  sequelize,
} = require('../../models');

module.exports = async function mockPlayer(UserId, steamId, username) {
  if (_.isUndefined(username)) {
    username = faker.internet.userName();
  }

  if (_.isUndefined(steamId)) {
    steamId = faker.random.number(76561190000000000, 76561200000000000);
  }

  if (_.isUndefined(UserId)) {
    const mockUser = await MockUser();
    UserId = mockUser.id;
  }

  const player = {
    steamId,
    username,
    UserId,
  };

  return sequelize.models.Player.create(player);
};

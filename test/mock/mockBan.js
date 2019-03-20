const faker = require('faker');
const _ = require('lodash');
const MockServer = require('./mockServer');
const MockPlayer = require('./mockPlayer');

const {
  reasons,
  games,
} = require('../../config/constants');

const {
  sequelize,
} = require('../../models');

module.exports = async function mockBan(ServerId, PlayerId) {
  if (_.isUndefined(ServerId)) {
    const mockServer = await MockServer();
    ServerId = mockServer.id;
  }

  if (_.isUndefined(PlayerId)) {
    const mockPlayer = await MockPlayer();
    PlayerId = mockPlayer.id;
  }

  const ReasonId = reasons[Math.floor(Math.random() * reasons.length)].id;
  const GameId = games[Math.floor(Math.random() * games.length)].id;

  const ban = {
    bannedUntil: faker.date.future(),
    ServerId,
    PlayerId,
    ReasonId,
    GameId,
  };

  return sequelize.models.Ban.create(ban);
};

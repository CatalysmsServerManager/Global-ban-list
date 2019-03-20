const faker = require('faker');
const _ = require('lodash');
const MockUser = require('./mockUser');

const {
  sequelize,
} = require('../../models');

module.exports = async function mockServer(name, ownerId) {
  if (_.isUndefined(name)) {
    name = faker.company.companyName();
  }

  if (_.isUndefined(ownerId)) {
    const mockUser = await MockUser();
    ownerId = mockUser.dataValues.id;
  }

  const server = {
    name,
    ownedById: ownerId,
  };

  return sequelize.models.Server.create(server);
};

'use strict';

const {
  games,
} = require('../config/constants')

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Games', games, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Games', null, {})
};
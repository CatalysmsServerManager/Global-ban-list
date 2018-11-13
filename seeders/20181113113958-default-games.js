'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Games', [{
      id: 1,
      name: '7 Days to Die',
    }
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Games', null, {})
};
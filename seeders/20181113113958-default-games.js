'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Games', [{
    id: 1,
    fullName: '7 Days to Die',
    code: '7d2d',
  },
  {
    id: 2,
    fullName: 'Rust',
    code: 'rust',
  },
  {
    id: 3,
    fullName: 'Minecraft',
    code: 'mc',
  }], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Games', null, {})
};
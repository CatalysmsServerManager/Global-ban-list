'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reasons', [{
      id: 1,
      reasonShort: 'Hacking',
      reasonLong: 'User has used external tools to gain an unfair advantage in the game.',
    },
    {
      id: 2,
      reasonShort: 'Racism',
      reasonLong: 'User has said racial slurs.',
    },
    {
      id: 3,
      reasonShort: 'Other',
      reasonLong: 'General reason when the defaults do not cover the actual reason of the ban.',
    },
  ], {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reasons', null, {})
};
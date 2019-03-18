'use strict';
const {
  reasons,
} = require('../config/constants')

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Reasons', reasons, {}),

  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Reasons', null, {})
};
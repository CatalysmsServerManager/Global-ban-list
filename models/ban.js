'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ban = sequelize.define('Ban', {
    bannedUntil: DataTypes.STRING
  }, {});
  Ban.associate = function(models) {
    // associations can be defined here
  };
  return Ban;
};
module.exports = (sequelize, DataTypes) => {
  const Ban = sequelize.define('Ban', {
    bannedUntil: DataTypes.STRING,
    reason: DataTypes.STRING,
  }, {});
  Ban.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
    // Ban.hasOne(models.Player)
  };
  return Ban;
};

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    steamId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    username: DataTypes.STRING,
  }, {});
  Player.associate = (models) => {
    // associations can be defined here
    Player.hasMany(models.Ban);
  };
  return Player;
};

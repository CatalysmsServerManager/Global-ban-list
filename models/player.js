
module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    steamId: DataTypes.STRING,
  }, {});
  Player.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Player;
};

module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('Player', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    steamId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: DataTypes.STRING,
  }, {});
  Player.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Player;
};

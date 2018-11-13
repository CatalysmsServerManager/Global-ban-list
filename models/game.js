module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  }, {});
  Game.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Game;
};

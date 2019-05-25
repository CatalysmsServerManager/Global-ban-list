module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('Game', {
    id: {
      type: DataTypes.INTEGER,
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
  }, {
      name: {
        singular: 'game',
        plural: 'games'
      }
    });
  Game.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Game;
};

module.exports = (sequelize, DataTypes) => {
  const Game = sequelize.define('game', {
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      name: 'createdAt',
      field: 'created_at'
    },
    updatedAt: {
      type: DataTypes.DATE,
      name: 'updatedAt',
      field: 'updated_at'
    },
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

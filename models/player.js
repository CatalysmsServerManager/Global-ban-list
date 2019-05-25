module.exports = (sequelize, DataTypes) => {
  const Player = sequelize.define('player', {
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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    steamId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
      name: {
        singular: 'player',
        plural: 'players'
      }
    });
  Player.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
    Player.belongsTo(models.user, {});
  };
  return Player;
};

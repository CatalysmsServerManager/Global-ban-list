const {
  DateTime,
} = require('luxon');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
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
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steamId: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    lastVisited: {
      type: DataTypes.DATE,
      defaultValue: () => DateTime.local().toISO(),
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
      name: {
        singular: 'user',
        plural: 'users'
      }
    });
  User.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return User;
};

const {
  DateTime,
} = require('luxon');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    steamId: {
      type: DataTypes.DATE,
      unique: true,
      allowNull: false,
    },
    lastVisited: {
      type: DataTypes.DATE,
      defaultValue: () => DateTime.local().toISO(),
    },
  }, {});
  User.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return User;
};

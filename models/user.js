
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    steamId: DataTypes.STRING,
  }, {});
  User.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return User;
};

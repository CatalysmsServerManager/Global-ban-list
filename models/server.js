Const crypto = require('crypto');

module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: DataTypes.STRING,
    steamId: DataTypes.STRING,
  }, {});
  Server.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Server;
};

const {
  reasons,
} = require('../config/constants')

module.exports = (sequelize, DataTypes) => {
  const Reason = sequelize.define('Reason', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    reasonShort: {
      type: DataTypes.STRING,
      allowNull: false,
      values: reasons.map(r => r.reasonShort),
    },
    reasonLong: {
      type: DataTypes.STRING,
      allowNull: false,
      values: reasons.map(r => r.reasonLong),
    },
  }, {});
  Reason.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Reason;
};

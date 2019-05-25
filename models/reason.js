const {
  reasons,
} = require('../config/constants');

module.exports = (sequelize, DataTypes) => {
  const Reason = sequelize.define('reason', {
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
  }, {
      name: {
        singular: 'reason',
        plural: 'reasons'
      }
    });
  Reason.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Reason;
};

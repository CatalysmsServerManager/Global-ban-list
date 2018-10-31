module.exports = (sequelize, DataTypes) => {
  const Ban = sequelize.define('Ban', {
    bannedUntil: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    reason: {
      type: DataTypes.ENUM,
      values: ['hacking', 'racism', 'other'],
      required: true,
    },
    deletedAt: DataTypes.DATE,
  }, {});
  Ban.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Ban;
};

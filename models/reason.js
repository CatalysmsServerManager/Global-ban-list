module.exports = (sequelize, DataTypes) => {
  const Reason = sequelize.define('Reason', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    reasonShort: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reasonLong: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {});
  Reason.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
  };
  return Reason;
};

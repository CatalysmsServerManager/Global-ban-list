module.exports = (sequelize, DataTypes) => {
  const Ban = sequelize.define('Ban', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    bannedUntil: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM,
      values: ['active', 'deleted', 'elapsed'],
      required: true,
    },
    deletedAt: DataTypes.DATE,
  }, {});
  Ban.associate = (models) => {
    // associations can be defined here
    Ban.belongsTo(models.User, {
      as: 'bannedBy',
    });
    Ban.belongsTo(models.User, {
      as: 'deletedBy',
    });
    Ban.belongsTo(models.Server);
    Ban.belongsTo(models.Player);
    Ban.belongsTo(models.Server);
    Ban.belongsTo(models.Reason);
  };
  return Ban;
};
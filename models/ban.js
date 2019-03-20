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
      defaultValue: 'active',
      required: true,
    },
    deletedAt: DataTypes.DATE,
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {});
  Ban.associate = (models) => {
    // associations can be defined here
    Ban.belongsTo(models.User, {
      as: 'bannedBy',
    });
    Ban.belongsTo(models.User, {
      as: 'deletedBy',
    });
    Ban.belongsTo(models.Server, {
      onDelete: 'CASCADE',
    });
    Ban.belongsTo(models.Player, {
      onDelete: 'CASCADE',
    });
    Ban.belongsTo(models.Reason, {
      onDelete: 'CASCADE',
    });
    Ban.belongsTo(models.Game, {
      onDelete: 'CASCADE',
    });
  };
  return Ban;
};

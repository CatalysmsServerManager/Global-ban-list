module.exports = (sequelize, DataTypes) => {
  const Ban = sequelize.define('ban', {
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
    verified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    proof: {
      type: DataTypes.TEXT,
      required: true,
    }
  }, {
      name: {
        singular: 'ban',
        plural: 'bans'
      }
    });
  Ban.associate = (models) => {
    // associations can be defined here
    Ban.belongsTo(models.user, {
      foreignKey: 'bannedBy'
    });
    Ban.belongsTo(models.player, {
      onDelete: 'CASCADE',
      foreignKey: 'Player',
    });
    Ban.belongsTo(models.reason, {
      onDelete: 'CASCADE',
      foreignKey: 'Reason'
    });
    Ban.belongsTo(models.game, {
      onDelete: 'CASCADE',
      foreignKey: 'Game'
    });
  };
  return Ban;
};

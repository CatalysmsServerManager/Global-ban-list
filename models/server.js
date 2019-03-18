module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  Server.associate = (models) => { // eslint-disable-line no-unused-vars
    // associations can be defined here
    Server.belongsTo(models.User, {
      as: 'ownedBy',
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };
  return Server;
};

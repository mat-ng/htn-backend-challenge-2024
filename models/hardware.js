module.exports = (sequelize, DataTypes) => {
  const Hardware = sequelize.define('Hardware', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    serial: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    timestamps: true
  });

  Hardware.associate = models => {
    Hardware.belongsTo(models.User, { foreignKey: 'userId' });
  };

  return Hardware;
};

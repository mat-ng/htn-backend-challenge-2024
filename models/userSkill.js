module.exports = (sequelize, DataTypes) => {
  const UserSkill = sequelize.define('UserSkill', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    skillId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    timestamps: true
  });

  return UserSkill;
};

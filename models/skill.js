module.exports = (sequelize, DataTypes) => {
  const Skill = sequelize.define('Skill', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    skill: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  }, {
    timestamps: true
  });

  Skill.associate = models => {
    Skill.belongsToMany(models.User, { through: 'UserSkill' });
  };

  return Skill;
};

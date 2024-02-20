const models = require('../models');

class UserService {
  constructor() {
    this.userModel = models.User;
    this.skillModel = models.Skill;
    this.userSkillModel = models.UserSkill;
    this.hardwareModel = models.Hardware;
    this.sequelize = models.sequelize;
  }

  getUsersAll = async () => {
    try {
      const usersRawData = await this.userModel.findAll({
        attributes: ['id', 'name', 'company', 'email', 'phone'],
        include: [{ model: this.skillModel, attributes: ['skill'], through: { attributes: ['rating'] } },
        { model: this.hardwareModel, attributes: ['serial'] }]
      });

      // Handle Sequelize-style objects
      const usersData = usersRawData.map(user => ({
        id: user.id,
        name: user.name,
        company: user.company,
        email: user.email,
        phone: user.phone,
        skills: user.Skills.map(skill => ({
          skill: skill.skill,
          rating: skill.UserSkill.rating
        })),
        hardware: user.Hardware
      }));

      return usersData;
    }
    catch (error) {
      throw error;
    }
  }

  getUserById = async (id) => {
    try {
      const userRawData = await this.userModel.findOne({
        where: { 'id': id },
        attributes: ['id', 'name', 'company', 'email', 'phone'],
        include: [{ model: this.skillModel, attributes: ['skill'], through: { attributes: ['rating'] } },
        { model: this.hardwareModel, attributes: ['serial'] }]
      });

      if (!userRawData) {
        throw error;
      }

      // Handle Sequelize-style object
      const userData = {
        id: userRawData.id,
        name: userRawData.name,
        company: userRawData.company,
        email: userRawData.email,
        phone: userRawData.phone,
        skills: userRawData.Skills.map(skill => ({
          skill: skill.skill,
          rating: skill.UserSkill.rating
        })),
        hardware: userRawData.Hardware
      };

      return userData;

    }
    catch (error) {
      throw error;
    }
  }

  updateUser = async (id, payload) => {
    try {
      const user = await models.User.findOne({
        where: { 'id': id },
        include: [{ model: models.Skill }]
      });

      if (payload.skills) {
        await this.updateUserSkills(user, payload.skills);
      }

      await user.update(payload);

      // Return updated user with updated skills
      const userUpdated = await this.getUserById(id);
      return userUpdated;
    }
    catch (error) {
      throw error;
    }
  }

  // Helper function to update a user's skills
  updateUserSkills = async (user, skillsPayload) => {
    try {
      // Get existing skills for the user
      const skillsExisted = user.Skills.filter(skillOld => skillsPayload.some(skillNew => skillNew.skill === skillOld.skill));

      // Update existing ratings with new ratings
      await Promise.all(skillsExisted.map(async skillOld => {
        await skillOld.update(skillsPayload.find(skillNew => skillNew.skill === skillOld.skill).rating);
      }))

      // Get new skills for the user
      const skillsNew = skillsPayload.filter(skill => !skillsExisted.includes(skill));

      // Add new skills to user
      await Promise.all(skillsNew.map(async skillNew => {
        const skillInDb = await this.skillModel.findOne({ where: { 'skill': skillNew.skill } })

        // Do not add skills that are not in the Skills table
        if (!skillInDb) {
          return;
        }

        return await user.addSkill(skillInDb, { through: { userId: user.id, skillId: skillInDb.id, rating: skillNew.rating } });
      }))
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = UserService;

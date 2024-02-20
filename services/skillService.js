const models = require('../models');

class SkillService {
  constructor() {
    this.skillModel = models.Skill;
    this.userSkillModel = models.UserSkill;
    this.sequelize = models.sequelize;
  }

  getSkills = async (minFreq, maxFreq) => {
    try {
      const skillsRawData = await this.userSkillModel.findAll({
        attributes: ['skillId', [this.sequelize.fn('COUNT', this.sequelize.col('skillId')), 'count']],
        group: ['skillId'],
        having: this.sequelize.literal(`COUNT(*) BETWEEN ${minFreq} AND ${maxFreq}`)
      });

      const skillsDataPromises = skillsRawData.map(async skillRaw => {
        const skill = await this.skillModel.findOne({
          attributes: ['id', 'skill'],
          where: { 'id': skillRaw.skillId }
        });
        return { skill: skill.skill, frequency: skillRaw.dataValues.count };
      });

      const skillsData = await Promise.all(skillsDataPromises);

      return skillsData;
    }
    catch (error) {
      throw error;
    }
  }
}

module.exports = SkillService;

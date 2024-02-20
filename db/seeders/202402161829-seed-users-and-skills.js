'use strict';
const models = require('../../models');
const axios = require('axios');

const challengeDataUrl = 'https://gist.githubusercontent.com/DanielYu842/607c1ae9c63c4e83e38865797057ff8f/raw/b84b8bce73fadb341258e86265a6091779908344/HTN_2023_BE_Challenge_Data.json';

module.exports = {
  up: async ({ }) => {
    try {
      const response = await axios.get(challengeDataUrl);
      const challengeData = response.data;

      // ================= Insert users from challenge data into Users table =================
      const usersInserted = await models.User.bulkCreate(challengeData, { fields: ['id', 'name', 'company', 'email', 'phone', 'createdAt', 'updatedAt'] });


      // ================= Insert skills from challenge data into Skills table =================

      // Create an array with all skills from challenge data
      const skillsAll = challengeData.flatMap(user => user.skills.map(skill => skill.skill));

      // Use a set to get unique skills
      const skillsSet = new Set(skillsAll);

      // Create array to be inserted into Skills table
      const skills = Array.from(skillsSet).map(skill => ({ skill }));

      // Insert skills into Skills table
      const skillsInserted = await models.Skill.bulkCreate(skills, { fields: ['id', 'skill', 'createdAt', 'updatedAt'] });


      // ================= Insert user-skill assocations junction table =================

      const userSkills = [];

      // Create mapping of inserted skills to skill ids
      // This eliminates the need to iterate through iterated skills everytime we need a skillId
      const skillIdMap = new Map();
      skillsInserted.forEach(skill => {
        skillIdMap.set(skill.skill, skill.id);
      });

      challengeData.forEach((user, i) => {
        user.skills.forEach(skill => {
          const skillId = skillIdMap.get(skill.skill);
          userSkills.push({
            userId: usersInserted[i].id,
            skillId,
            rating: skill.rating
          });
        });
      });

      await models.UserSkill.bulkCreate(userSkills, { fields: ['id', 'userId', 'skillId', 'rating', 'createdAt', 'updatedAt'] });
    }
    catch (error) {
      console.log('Seeding challenge data failed: ', error);
    }
  },
  down: async ({ }) => { }
}

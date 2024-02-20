const SkillService = require('../services/skillService');

const getSkills = async (req, res, next) => {
  try {
    const minFreq = req.query.min_frequency;
    const maxFreq = req.query.max_frequency;

    if (!Number.isInteger(parseInt(minFreq)) || !Number.isInteger(parseInt(maxFreq))) {
      const error = new Error(`Bad Request: invalid min_frequency or max_frequency`);
      error.status = 400;
      throw error;
    }

    const skillService = new SkillService();
    const skills = await skillService.getSkills(minFreq, maxFreq);
    res.status(200).json(skills);
  }
  catch (error) {
    if (!error.status) {
      error.status = 500;
      error.message = 'Error: could not get skills';
    }
    next(error);
  }
}

module.exports = { getSkills };

const express = require('express');

const { getSkills } = require('../controllers/skills');

const router = express.Router();

router.get('/', getSkills);

module.exports = router;

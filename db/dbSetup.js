const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

const runMigrations = require('./runMigrations.js');
const runSeeders = require('./runSeeders.js');

dotenv.config();

// Load config based on environment
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../config/config.json')[environment];

const dbSetup = async () => {
  const sequelize = await new Sequelize(config);

  try {
    await runMigrations(sequelize);
    await runSeeders(sequelize);
    console.log('Database setup successful!')
  }

  catch (error) {
    console.log('Error with database setup: ', error);
  }
};

module.exports = dbSetup;

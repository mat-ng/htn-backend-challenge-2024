const fs = require('fs');
const path = require('path');

const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Load config based on environment
const environment = process.env.ENVIRONMENT || 'development';
const config = require('../config/config.json')[environment];

// Create a new Sequelize instance
const sequelize = new Sequelize(config);

// Create db object to hold models
const db = {};

// Read model files in models directory
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js')
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

// Apply associations
Object.values(db).forEach(model => {
  if (model.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = sequelize;

module.exports = db;

const path = require('path');

const { Umzug, SequelizeStorage } = require('umzug');

const runMigrations = async (sequelize) => {
  console.log('Running migrations...');

  const umzug = new Umzug({
    migrations: { glob: ['migrations/*.js', { cwd: __dirname }] },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
  });

  try {
    await umzug.up();
    console.log('Migrations successful!');
  }

  catch (error) {
    console.log('Migrations failed: ', error);
  }
};

module.exports = runMigrations;

const path = require('path');

const { Umzug, SequelizeStorage } = require('umzug');

const runSeeders = async (sequelize) => {
  console.log('Running seeders...');

  const umzug = new Umzug({
    migrations: { glob: ['seeders/*.js', { cwd: __dirname }] },
    context: sequelize.getQueryInterface(),
    storage: new SequelizeStorage({ sequelize }),
  });

  try {
    await umzug.up()
    console.log('Seeders successful!');
  }

  catch (error) {
    console.log('Seeders failed: ', error);
  }
};

module.exports = runSeeders;

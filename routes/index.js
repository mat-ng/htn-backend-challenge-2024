const path = require('path');

const userRoutes = require('./users');
const skillRoutes = require('./skills')
const hardwareRoutes = require('./hardwares')

module.exports = app => {
  app.use('/users', userRoutes);
  app.use('/skills', skillRoutes);
  app.use('/hardwares', hardwareRoutes);

  app.use((req, res) => {
    return res.status(404).send('Sorry, invalid request or endpoint');
  });

  return app;
}

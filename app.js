const path = require('path');

const express = require('express');

const routes = require('./routes');
const errorHandler = require('./middleware/errorHandler.js');

const app = express();

app.use(express.json());

routes(app);

app.use(errorHandler);

module.exports = app;

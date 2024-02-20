const http = require('http');

const app = require('./app.js');
const dbSetup = require("./db/dbSetup.js");

const port = process.env.PORT || '3000';

const server = async () => {
  await dbSetup();

  app.set('port', port);

  const server = http.createServer(app);

  server.listen(port);
  console.log("Listening on port " + port);
}

server();

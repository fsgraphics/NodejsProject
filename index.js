/*
 * Title: Uptime Monitoring Application
 * Description: A RESTFul API to monitor up or down time of user defined links
 * Author: Fazle Hasan
 * Date: 01/01/2025
 *
 */

// dependencies
const http = require("http");
const { hendleReqRes } = require("./helpers/hendleReqRes");
const environment  = require('./helpers/enviroments');

// app object - module scaffolding
const app = {};


// create server
app.createServer = () => {
  const server = http.createServer(app.handleReqRes);
  server.listen(environment.port, () => {
    console.log(`listening to port ${environment.port}`);
  });
};

// handle Request Response
app.handleReqRes = hendleReqRes;
// start the server
app.createServer();

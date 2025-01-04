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
const data = require('./lib/data')

// app object - module scaffolding
const app = {};

// for Test file create
data.update('test','newFile', {fname:"Suraiya",lname:"Jahan",age:"23",city:"Dhaka"}, (err,result)=>{
  console.log(err, result)
})

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

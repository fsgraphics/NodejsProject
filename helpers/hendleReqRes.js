/*
 * Title: Handle Request Response
 * Description: Handle Resquest and response
 * Author: Fazle Hasan
 * Date: 01/01/2025
 *
 */

// dependencies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/routeHandler/notFounHandler");
const { parseJSON } = require("./utilities");
// module scaffolding
const handler = {};

handler.hendleReqRes = (req, res) => {
  // request hendling
  // get the url and parse it
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  const trimminedPath = path.replace(/^\/+|\/+$/g, "");
  const method = req.method.toLowerCase();
  const queryStringObject = parsedUrl.query;
  const headerObject = req.headers;
  const requestProperties = {
    parsedUrl,
    path,
    trimminedPath,
    method,
    queryStringObject,
    headerObject,
  };
  const decoder = new StringDecoder("utf-8");
  let realData = "";
  const chosenHandler = routes[trimminedPath]
    ? routes[trimminedPath]
    : notFoundHandler;
  req.on("data", (buffer) => {
    realData += decoder.write(buffer);
  });
  req.on("end", () => {
    realData += decoder.end();
    requestProperties.body = parseJSON(realData);
    chosenHandler(requestProperties, (statusCode, payload) => {
      statusCode = typeof statusCode === "number" ? statusCode : 500;
      payload = typeof payload === "object" ? payload : {};

      const payloadString = JSON.stringify(payload);
      //return the final response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
    });
  });
};

module.exports = handler;

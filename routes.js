/*
 * Title: Routes
 * Description: Application Routes
 * Author: Fazle Hasan
 * Date: 01/01/2025
 *
 */
// dependencies
const { sampleHandler } = require("./handlers/routeHandler/sampleHandler");
const { userHandler } = require("./handlers/routeHandler/userHendler");

const routes = {
  sample: sampleHandler,
  user: userHandler,
};

module.exports = routes;

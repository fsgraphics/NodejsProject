/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Fazle Hasan
 * Date: 01/01/2025
 *
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requestProperties, callback) => {
  callback(404, {
    massage: "Your Requested URL was Not Found",
  });
};

module.exports = handler;

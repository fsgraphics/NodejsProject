/*
 * Title: Sample Handler
 * Description: Sample Handler
 * Author: Fazle Hasan
 * Date: 01/01/2025
 *
 */
// module scaffolding
const handler = {};

handler.sampleHandler = (requestProperties, callback) => {
  console.log(requestProperties);
  callback(200, {
    massage: "This is Sample url",
  });
};

module.exports = handler;

/*
 * Title: Check Handler
 * Description: Check Handler
 * Author: Fazle Hasan
 * Date: 06/01/2025
 *
 */
// dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");
const { parseJSON, createRandomString } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/enviroments");

// module scaffolding

const handler = {};

handler.checkHandler = (requestProperties, callback) => {
  const acceptedMethods = ["get", "post", "put", "delete"];

  if (acceptedMethods.indexOf(requestProperties.method) > -1) {
    handler._check[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};

handler._check = {};

handler._check.post = (requestProperties, callback) => {
  //validate input
  let protocal =
    typeof requestProperties.body.protocal === "string" &&
    ["http", "https"].indexOf(requestProperties.body.protocal) > -1
      ? requestProperties.body.protocal
      : false;
  let url =
    typeof requestProperties.body.url === "string" &&
    requestProperties.body.url.trim().length > 0
      ? requestProperties.body.url
      : false;
  let method =
    typeof requestProperties.body.method === "string" &&
    ["get", "put", "delete"].indexOf(requestProperties.body.method) > -1
      ? requestProperties.body.method
      : false;
  let successCode =
    typeof requestProperties.body.successCode === "object" &&
    requestProperties.body.successCode instanceof Array
      ? requestProperties.body.successCode
      : false;
  let timeoutSecond =
    typeof requestProperties.body.timeoutSecond === "number" &&
    requestProperties.body.timeoutSecond % 1 === 0 &&
    requestProperties.body.timeoutSecond >= 1 &&
    requestProperties.body.timeoutSecond <= 5
      ? requestProperties.body.timeoutSecond
      : false;
  if ((protocal && url) || method || successCode || timeoutSecond) {
    let token =
      typeof requestProperties.headerObject.token === "string"
        ? requestProperties.headerObject.token
        : false;
    // lookup the user phone by reading the token
    data.read("tokens", token, (err, tokenData) => {
      if (!err && tokenData) {
        let userPhone = parseJSON(tokenData).phone;
        // lookup the user data
        data.read("users", userPhone, (err, userData) => {
          if (!err && userData) {
            tokenHandler._token.verify(token, userPhone, (tokenIsValid) => {
              if (tokenHandler) {
                let userObject = parseJSON(userData);
                let userCheck =
                  typeof userObject.checks === "object" &&
                  userObject.checks instanceof Array
                    ? userObject.checks
                    : [];
                if (userCheck.length < maxChecks) {
                  let checkId = createRandomString(20);
                  let checkObject = {
                    id: checkId,
                    userPhone,
                    protocal,
                    url,
                    method,
                    successCode,
                    timeoutSecond
                  };
                  // save the object
                  data.create("checks", checkId, checkObject, (err3) => {
                    if (!err) {
                      // add check id to the user's object
                      userObject.checks = userCheck;
                      userObject.checks.push(checkId);
                      // save the new user data
                      data.update("users", userPhone, userObject, (err) => {
                        if (!err) {
                          // return the data about the new check
                          callback(200, checkObject);
                        } else {
                          callback(500, {
                            error: "There Was a problem in the server side!",
                          });
                        }
                      });
                    } else {
                      callback(500, {
                        error: "There Was a problem in the server side!",
                      });
                    }
                  });
                } else {
                  callback(401, {
                    error: "User has already reached max checks limit!",
                  });
                }
              } else {
                callback(403, {
                  error: "Authentication Problem",
                });
              }
            });
          } else {
            callback(403, {
              error: "User Not Found",
            });
          }
        });
      } else {
        callback(403, {
          error: "Authentication Problem!",
        });
      }
    });
  } else {
    callback(404, {
      error: "You have a problem  in ypur request!",
    });
  }
};

handler._check.get = (requestProperties, callback) => {};
handler._check.put = (requestProperties, callback) => {};
handler._check.delete = (requestProperties, callback) => {};

module.exports = handler;

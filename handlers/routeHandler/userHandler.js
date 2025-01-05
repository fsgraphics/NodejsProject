/*
 * Title: User Handler
 * Description: User Handler
 * Author: Fazle Hasan
 * Date: 04/01/2025
 *
 */
// dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");

// module scaffolding

const handler = {Name:'Fazle Hasan'};

handler.userHandler = (requestProperties, callback) => {
  const acceptedMethods = ["GET", "POST", "PUT", "DELETE"];
  if (acceptedMethods.indexOf(requestProperties.method) >= -1) {
    handler._users[requestProperties.method](requestProperties, callback);
  } else {
    callback(405);
  }
};
handler._users = {};


handler._users.post = (requestProperties, callback) => {
  // const firstName =
  //   typeof requestProperties.body.firstName === "string" &&
  //   requestProperties.body.firstName.trim().length > 0
  //     ? requestProperties.body.firstName
  //     : false;

  // const lastName =
  //   typeof requestProperties.body.lastName === "string" &&
  //   requestProperties.body.lastName.trim().length > 0
  //     ? requestProperties.body.lastName
  //     : false;

  // const phone =
  //   typeof requestProperties.body.phone === "string" &&
  //   requestProperties.body.phone.trim().length === 11
  //     ? requestProperties.body.phone
  //     : false;

  // const password =
  //   typeof requestProperties.body.password === "string" &&
  //   requestProperties.body.password.trim().length > 0
  //     ? requestProperties.body.password
  //     : false;
  // const tosAgreement =
  //   typeof requestProperties.body.tosAgreement === "boolean" &&
  //   requestProperties.body.tosAgreement
  //     ? requestProperties.body.tosAgreement
  //     : false;
  // if (firstName && lastName && phone && password && tosAgreement) {
  //   // make sure that the user doesn't already exists
  //   data.read("users", phone, (err1) => {
  //     if (err1) {
  //       let userObject = {
  //         firstName,
  //         lastName,
  //         phone,
  //         password: hash(password),
  //         tosAgreement,
  //       };
  //       // store the user to db
  //       data.create("users", phone, userObject, (err2) => {
  //         if (!err2) {
  //           callback(200, {
  //             maggase: "User was create successfully!",
  //           });
  //         } else {
  //           callback(500, { error: "Could not create user22" });
  //         }
  //       });
  //     } else {
  //       callback(500, {
  //         error: "There was a problem in server side!",
  //       });
  //     }
  //   });
  // } else {
  //   callback(400, { error: " You have a problem in your request" });
  // }
  callback(200)
};

handler._users.get = (requestProperties, callback) => {
  callback(200, {requestProperties})
};
handler._users.put = (requestProperties, callback) => {};
handler._users.delete = (requestProperties, callback) => {};

module.exports = handler;

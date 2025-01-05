/*
 * Title: Data Library
 * Description: Data Library functions for CRUD
 * Author: Sumit Saha ( Learn with Sumit )
 * Date: 11/20/2020
 *
 */

// dependencies
const fs = require("fs");
const path = require("path");
// module scaffolding
const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, "/../.data/");

// write data to file
lib.create = (dir, file, data, callback) => {
  // open file for writing
  fs.open(
    lib.basedir + dir + "/" + file + ".json",
    "wx",
    (err, fileDescriptor) => {
      if (!err && fileDescriptor) {
        // convert data to stirng
        const strinData = JSON.stringify(data);

        // write data to file and then close it
        fs.writeFile(fileDescriptor, strinData, (err) => {
          if (!err) {
            // close the file
            fs.close(fileDescriptor, (err) => {
              if (!err) {
                callback(false);
              } else {
                callback("Error closing the new file");
              }
            });
          } else {
            callback("Error writing to new file");
          }
        });
      } else {
        callback("could not create new file, it may already exists");
      }
    }
  );
};

// read data from file
lib.read = (dir, file, callback) => {
  fs.readFile(`${lib.basedir + dir}/${file}.json`, "utf-8", (err, data) => {
    callback(err, data);
  });
};
// update existing file
lib.update = (dir, file, data, callback) => {
  //file open for writing
  fs.open(`${lib.basedir + dir}/${file}.json`, "r+", (err, fileDescriptor) => {
    if (!err && fileDescriptor) {
      const stringData = JSON.stringify(data);
      fs.ftruncate(fileDescriptor, (err) => {
        if (!err) {
          fs.writeFile(fileDescriptor, stringData, (err) => {
            if (!err) {
              callback(false);
            } else {
              callback("Error waoting to file");
            }
          });
        } else {
          callback("Error truncate file!");
        }
      });
    } else {
      console.log("Error updating File may not Exist");
    }
  });
};
// delete existing file
lib.delete = (dir, file, callback) => {
  // unlink file
  fs.unlink(`${lib.basedir + dir}/${file}.json`, (err) => {
    if (!err) {
      callback(false);
    } else {
      callback(`Error deleting file`);
    }
  });
};
module.exports = lib;

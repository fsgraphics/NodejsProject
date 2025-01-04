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
    fs.open(lib.basedir + dir+ '/'+ file+'.json', 'wx',(err, fileDescriptor) => {
        if(!err && fileDescriptor){
    // convert data to stirng
    const strinData = JSON.stringify(data)

    // write data to file and then close it
    fs.writeFile(fileDescriptor, strinData )
        }else {
            callback()
        }
    })
}
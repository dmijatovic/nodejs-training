

console.log("Starting app.js");

//require FileSystem module
const fs = require('fs');
//import lodash
const _ = require('lodash');

//require local file
const notes = require('./notes')

//get arguments passed on the start of app 
//using process
const command = process.argv[2];

if(command == 'add'){
  console.log("Adding new note");
} else if (command=='list') {
  console.log("Listing notes");
} else if (command=='read'){
  console.log("Read note"); 
} else if (command=='remove'){
  console.log("Remove note"); 
} else {
  console.log("Unknown command: " + command);
}


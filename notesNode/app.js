

console.log("Starting app.js");

//require FileSystem module
const fs = require('fs');
//import lodash
const _ = require('lodash');
//lib for taking console arguments
//const yargs = require('yargs');

//require local file
const notes = require('./notes');
//get arguments passed on the start of app 
//using process
//const command = process.argv[2];
//using yargs
debugger
const argv = require('./argsv');
const command = argv._[0];

if(command == 'add'){
  //console.log("Adding new note");
  notes.addNote({
    title: argv.title,
    body: argv.body
  });
} else if (command=='list') {
  //console.log("Listing notes");
  notes.getAll();
} else if (command=='read'){
  //console.log("Read note");
  let note = notes.getNote(argv.title);
  if (note){
    notes.logNote(note);
  }else{
    console.log("Note not found...", argv.title)
  } 
} else if (command=='remove'){
  notes.removeNote(argv.title);
  //console.log("Remove note"); 
} else {
  console.log("Unknown command: " + command);
}

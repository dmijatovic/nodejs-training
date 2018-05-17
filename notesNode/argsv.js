/**
 * Define commands and arguments used by app.js 
 * Using yargs to create definitions
 */
//lib for taking console arguments
const yargs = require('yargs');

const title={
  describe: "Title of note",
  demand: true,
  alias: 't'
}
const body={
  describe: "Body of note",
  demand: true,
  alias: 'b'
}


const argsv = yargs
  .command('add',"Add a new note",{
    title: title,
    body: body    
  })
  .command('list',"List all notes")
  .command("read","Read a note",{
    title: title 
  })
  .command("remove","Remove a note",{
    title: title 
  })
  .help()
  .argv;

module.exports = argsv;
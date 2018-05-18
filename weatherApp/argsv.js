const yargs = require('yargs');

const argsv = yargs
  .options({
    a:{
      demand: true,
      alias:'address',
      describe:'Address to fetch weather for',
      string: true
    } 
  })
  .help()
  .alias('help','h')
  .argv;


module.exports = argsv;
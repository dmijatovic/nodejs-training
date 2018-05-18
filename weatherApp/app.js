
const argsv = require('./argsv');
const maps = require('./maps.api');
const weather = require('./weather.api');

/**
 * Get location from address string
*/
maps.getLocationInfo(argsv.address)
.then((d)=>{
  //console.log("data...", d);
  return weather.getWeatherInfo(d.location);
})
.then((d)=>{
  console.log(d);
},(e)=>{
  console.log(e);
});




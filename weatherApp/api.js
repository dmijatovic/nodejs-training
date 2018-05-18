
//const argsv = require('./argsv');
const maps = require('./maps.api');
const weather = require('./weather.api');
const express = require('express');
const bodyParser = require('body-parser');


//console.log(argsv);
const app = express();

app.use(bodyParser.json())

app.use("/", express.static('./html'));

app.post('/weather',(req,res)=>{

  let address = JSON.parse(req.body); 
  /**
   * Get location from address string
  
  maps.getLocationInfo(argsv.address)
  .then((d)=>{
    //console.log("data...", d);
    return weather.getWeatherInfo(d.location);
  },(e)=>{
    console.log(e);
  });
   */
  res.send(JSON.stringify(address));

});

app.listen(4040,()=>{
  console.log("Weather app on port 4040");
})




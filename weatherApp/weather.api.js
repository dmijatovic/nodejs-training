

const fetch = require('node-fetch');

let baseUrl = "https://api.darksky.net/forecast/b4188a2c91fb38ede34ac300ca8888a0/";

module.exports = {
  getWeatherInfo(location){
    let url = baseUrl + location.lat + "," + location.lng;
    
    //add query params
    url+= "?units=si&lang=nl&exclude=minutely,hourly,alerts"

    return fetch(url,{
      method:'GET',
      headers: { 
        'Content-Type': 'application/json'
      },
      params:{

      }
    })
    .then(resp => resp.json())
    .then((d)=>{
      //debugger
      return d;
    })
    .catch((e)=>{
      throw e;
      //console.log("Error...", e);
    });
  }
}

const fetch = require('node-fetch');

let baseUrl =  "https://maps.googleapis.com/maps/api/geocode/json";

module.exports = {
  /**
   * Get location lat/lng based on address string
   * @param address:string  
   */
  getLocationInfo(address){
    let url = baseUrl + `?address="${address}"`;
    
    return fetch(url,{
        method:'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      .then(resp => resp.json())
      .then((d)=>{
        debugger
        if (d.status==="OK" && d.results){
          //take firstone
          let data = d.results[0];
          return {
            address: data.formatted_address,
            location: data.geometry.location
          };  
        } else if (d.status==="ZERO_RESULTS"){
          throw Error("Unable to find location for that address!");
        } else{
          throw Error(d.status + " - " + d.error_message);
        }
      })
      .catch((e)=>{
        throw e;
        //console.log("Error...", e);
      });
  }
};
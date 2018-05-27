

module.exports = {
  generateMessage({from, body, location}){
    let lat=null, lng=null;
    if(location){
      lat = location.lat;
      lng = location.lng;
    }
    return {
      from: from,
      body: body,
      location: {
        lat: lat,
        lng: lng
      },
      createdAt: new Date().toISOString()
    }
  }
}
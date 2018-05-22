//ES5 way of require
//const mongoClient = require('mongodb').MongoClient;
//ES6 desrtucuting way of require
const {MongoClient, ObjectID} = require('mongodb');

//create new objectId
let obj = new ObjectID();

//console.log(obj);

const mongo={
  url:"mongodb://localhost:27017",
  db:"todos"
}

//connect to mongoDB server
MongoClient.connect(mongo.url,{useNewUrlParser: true}, (err, client)=>{
  if (err){
    return console.log("Cannot connect to mongoDB server at...", mongo.url);
  }

  let db = client.db(mongo.db);

  //findOneAndUpdate - returns deleted object
  // see documentation http://mongodb.github.io/node-mongodb-native/3.0/api/Collection.html#findOneAndUpdate
  db.collection("users").findOneAndUpdate({
    name:'Dusan'
  },{
    //update object 
    //see operators https://docs.mongodb.com/manual/reference/operator/update/
    $set:{
      name:'Aleksandar',
      location:'Amsterdam'
    },
    //increment age by 1
    $inc:{
      age: 1
    }
  },{
    //options parameters
    //do not return old records but rather new
    returnOriginal: false
  }).then((data)=>{
    console.log("findOneAndUpdate...", data);
  },(e)=>{
    console.log("Errors");
  });
  //console.log("Connected to mongoDB");
  //client.close();
});
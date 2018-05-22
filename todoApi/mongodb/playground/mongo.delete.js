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

  /*
  //deleteMany
  db.collection("users").deleteMany({
    location:'Amsterdam'
  }).then((d)=>{
    console.log("deleteMany...", d.result);
  },(e)=>{
    console.log("Errors");
  })*/

  /*
  //deleteOne
  db.collection("users").deleteOne({
    name:'Dusan'
  }).then((d)=>{
    console.log("deleteOne...", d.result);
  },(e)=>{
    console.log("Errors");
  })*/

  //findOneAndDelete - returns deleted object
  db.collection("users").findOneAndDelete({
    name:'Dusan'
  }).then((data)=>{
    console.log("deleteOne...", data);
  },(e)=>{
    console.log("Errors");
  })


  //console.log("Connected to mongoDB");
  //client.close();
});
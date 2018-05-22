//ES5 way of require
//const mongoClient = require('mongodb').MongoClient;
//ES6 desrtucuting way of require
const {MongoClient, ObjectID} = require('mongodb');

//create new objectId
let obj = new ObjectID();

console.log(obj);

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

  //insert one recor into users collection
  db.collection("users").insertOne({
    name:"Dusan",
    age:47,
    location:"Beograd"
  },(err,result)=>{
    if (err){
      //show error
      console.log("Unable to insert user", err);
    }else{
      //show log
      console.log(result.ops[0]._id.getTimestamp())
    }
  });

  //console.log("Connected to mongoDB");

  client.close();
});
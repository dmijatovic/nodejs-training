//ES5 way of require
//const mongoClient = require('mongodb').MongoClient;
//ES6 desrtucuting way of require
const { MongoClient, ObjectID } = require('mongodb');

//create new objectId
let obj = new ObjectID();

//console.log(obj);

const mongo={
  url:"mongodb://localhost:27017",
  db:"todos"
}


const mongodb = {
  db:null,
  /**
   * Connect to mongodb database
   * @param {*} db: database name, default is todos in this sample  
   */
  connect(db="todos"){
    //connect to mongoDB server
    MongoClient.connect(mongo.url,{useNewUrlParser: true}, (err, client)=>{
      if (err){
        return console.log("Cannot connect to mongoDB server at...", mongo.url);
      }
      this.db = client.db(db);
    });
  },
  findAll({collection, filter}){
    this.db.collection(collection).find()
  },
  findOne(){

  } 



}

//connect to mongoDB server
MongoClient.connect(mongo.url,{useNewUrlParser: true}, (err, client)=>{
  if (err){
    return console.log("Cannot connect to mongoDB server at...", mongo.url);
  }

  let db = client.db(mongo.db);

  /*
  //get all records from table/collection
  db.collection("users").find().toArray()
  .then((data)=>{
    console.log("Todos");
    console.log(JSON.stringify(data,undefined,2));
  },(e)=>{
    console.log("Failed...", e);
  });*/

  /*
  //find records - query _id="5b04062ef12e3906e739886e"
  db.collection("users").find({location:'Beograd'}).toArray()
  .then((data)=>{
    console.log("Todos");
    console.log(JSON.stringify(data,undefined,2));
  },(e)=>{
    console.log("Failed...", e);
  });*/

  //quering by mongodb _id - use objectID
  db.collection("users").find({_id:new ObjectID("5b04062ef12e3906e739886e")}).toArray()
  .then((data)=>{
    console.log("Todos");
    console.log(JSON.stringify(data,undefined,2));
  },(e)=>{
    console.log("Failed...", e);
  })

  //console.log("Connected to mongoDB");
  //client.close();
});
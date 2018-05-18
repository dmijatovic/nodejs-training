
const mongoClient = require('mongodb').MongoClient;

const mongo={
  url:"mongodb://localhost:27017",
  db:"todos"
}

//connect to mongoDB server
mongoClient.connect(mongo.url, (err, client)=>{
  if (err){
    return console.log("Cannot connect to mongoDB server at...", mongo.url);
  }

  let db = client.db(mongo.db);

  console.log("Connected to mongoDB");

  client.close();
});
//get environment variables
let env = process.env.NODE_ENV || "development";

if (env === 'development' || env === "test"){
  let config = require("./config.json");
  let envConfig = config[env]
  Object.keys(envConfig).map((key)=>{
    process.env[key] = envConfig[key];
  });
}

//console.log("env", process.env)

//let config = require("./config.json");
//console.log(config);

//console.log("working")
/*
//set environements 
if (env==='development'){
  //development environement with local mongodb
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoApp";
}else if (env==='test'){
  //test environement using mongodb test collection
  process.env.PORT = 3000;
  process.env.MONGODB_URI = "mongodb://localhost:27017/TodoAppTest";
}
*/
//get environment variables
let env = process.env.NODE_ENV || "development";

if (env === 'development' || env === "test"){
  let config = require("./config.json");
  let envConfig = config[env]
  Object.keys(envConfig).map((key)=>{
    process.env[key] = envConfig[key];
  });
}
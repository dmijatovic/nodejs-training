const mongoose = require('mongoose');

//connect to heroku mlab or local mongoDB
const mongodb={
  url: process.env.MONGODB_URI
}

//use promises
mongoose.Promise = global.Promise;
mongoose.connect(mongodb.url);

module.exports = {mongoose};
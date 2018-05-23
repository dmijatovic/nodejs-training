const mongoose = require('mongoose');
const mongodb={
  url:"mongodb://localhost:27017/TodoApp",
}

//use promises
mongoose.Promise = global.Promise;
mongoose.connect(mongodb.url);

module.exports = {mongoose};
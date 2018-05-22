const mongoose = require('mongoose');
const mongodb={
  url:"mongodb://localhost:27017/TodoApp",
}

//use promises
mongoose.Promise = global.Promise;
mongoose.connect(mongodb.url);

/*
//mongoose todo model
let ToDo = require('./todo.model'),
  User = require('./user.model');


var { ToDo, User } = require ('./models');

//mongo object
const mongo={
  cnn: null, 
  init(){
    return new Promise((res,rej)=>{
      mongoose.connect(mongodb.url)
      .then(()=>{
        //save connection
        this.cnn = mongoose.connection;
        res(true);
      },(e)=>{
        this.cnn = null;
        rej(e);
      })
    });
  },
  addToDo(data){
    let newTodo = new ToDo(data);
    return newTodo.save();
  },
  addUser(data){
    let newUser = new User(data);
    return newUser.save();
  }
}
*/
module.exports = {mongoose};

const { ToDo, User } = require('../mongodb/models');
const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const secret = require('../middleware/.secret');
const bcrypt = require('bcryptjs');
//---------------------------------
// TODOS
const todos=[
  {text: "First test todo"},
  {text: "Second test todo"},
  {text: "Third test todo"}
]

const populateTodos = (done)=>{
  //remove all records
  ToDo.remove({})
    .then(()=>{
      //insert dummy todos
      return ToDo.insertMany(todos)
    })
    .then(()=>done());
}


//---------------------------------
//USERS
const id1 = new ObjectID();
const id2 = new ObjectID();

const users=[{
  _id: id1,
  email:"test1@test.com",
  password:'firstPassword1234',
  tokens:[{
    access:'auth',
    token: jwt.sign({_id: id1, access:'auth'}, secret).toString()
  }]
},{
  email:"test2@test.com",
  password:'SecPa55word!23@#$&'
}]

const populateUsers = (done)=>{
  User.remove({})
  .then(()=>{
    users.map((item)=>{
      let user = new User(item)
      return user.save()
    })
    //return User.insertMany(users);
  })
  .then(()=>done());
}


module.exports = {
  populateTodos,
  users, populateUsers
};
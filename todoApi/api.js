const express = require ('express');
const bodyParser = require('body-parser');

const { mongoose } = require ('./mongodb/mongoose');
const { ToDo, User } = require ('./mongodb/models');
//set express
let api = express();
//use body parser middleware
api.use(bodyParser.json());

//set root route
api.get('/',(req,res)=>{
  res.send("It works");
});

//set post todos route
api.post('/todos',(req,res)=>{
  //console.log("/todos...",req.body);
  let todo = new ToDo({
    text: req.body['text']
  });
  //save todo to mongodb
  todo.save().then((d)=>{
    res.send(d);
  },(e)=>{
    res.status(400).send(e);
  });
});

//get all todos
api.get('/todos',(req,res)=>{
  ToDo.find({}).then((todos)=>{
    res.send({
      data:todos
    });
  },(e)=>{
    res.status(400).send(e);
  })
});


api.listen(3000,()=>{
  console.log("Started on 3000");
});

module.exports = {api};
const express = require ('express');
const bodyParser = require('body-parser');

const { ObjectID } = require('mongodb');
const { mongoose } = require ('./mongodb/mongoose');
const { ToDo, User } = require ('./mongodb/models');
//set api port
const port = process.env.PORT || 3000;
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

//get todo by id
api.get('/todos/:id', (req, res)=>{
  //get id from params
  let id = req.params.id;
  if (ObjectID.isValid(id)){
    ToDo.findById(id).then((todo)=>{
      if(todo){
        res.send({
          data: todo
        });
      }else{
        res.status(404).send({
          error:"Id not found"
        });    
      }
    });
  }else{
    res.status(404).send({
      error:"Id not valid"
    });
  }
});



api.listen(port,()=>{
  console.log(`Started on ${port}`);
});

module.exports = {api};
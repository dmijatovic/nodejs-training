//load configuration
require('./config/config');

//load dependencies
const express = require ('express');
const bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');
const { mongoose } = require ('./mongodb/mongoose');
const { ToDo, User } = require ('./mongodb/models');
const auth = require('./middleware/authenticate');

//set express
let api = express();
//use body parser middleware
api.use(bodyParser.json());

//------------------------------------
//set root route
api.get('/',(req,res)=>{
  res.send("It works");
});

//------------------------------------
//set post todos route
api.post('/todos',auth ,(req,res)=>{
  //console.log("/todos...",req.body);
  let todo = new ToDo({
    text: req.body['text'],
    creator: req.user._id
  });
  //save todo to mongodb
  todo.save().then((d)=>{
    res.send(d);
  },(e)=>{
    res.status(400).send(e);
  });
});

//get all todos
api.get('/todos',auth, (req,res)=>{
  //find all todos from specific owner
  ToDo.find({
    creator: req.user._id
  }).then((todos)=>{
    res.send({
      data:todos
    });
  },(e)=>{
    res.status(400).send(e);
  })
});

//get todo by id
api.get('/todos/:id', auth, (req, res)=>{
  //get id from params
  let id = req.params.id;
  if (ObjectID.isValid(id)){
    debugger 
    ToDo.findOne({
      _id: id,
      creator: req.user._id
    }).then((todo)=>{
      debugger 
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
    debugger 
    res.status(404).send({
      error:"Id not valid"
    });
  }
});

//delete todo by id
api.delete('/todos/:id',auth, (req,res)=>{
   //get id from params
  let id = req.params.id;
  if (ObjectID.isValid(id)){
    ToDo.findOneAndRemove({
      _id: id,
      creator: req.user._id
    }).then((todo)=>{
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

//update todo
api.patch('/todos/:id',auth, (req,res)=>{
  let id = req.params.id,
    body = {
      completed: req.body['completed'] || false,
      text: req.body['text']
    };

  if (ObjectID.isValid(id)){
    //debugger
    if (body.completed){
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }
    //update todo item
    ToDo.findByIdAndUpdate(id,{
      $set: body
    },{
      new: true
    })
    .then((todo)=>{
      //debugger 
      if (todo){
        res.send({
          data: todo
        });
      }else{
        res.status(400).send({
          error: "404 - id not valid"
        });
      }
    },(e)=>{
      res.status(404).send({
        error: "400 - update failed"
      });
    }); 
  }else{
    res.status(404).send({
      error:"Id not valid"
    });
  }
});

// create user
api.post('/users', async(req,res)=>{
  try{
    let body = {
      email: req.body.email,
      password: req.body.password,
    }
    //debugger 
    let user = new User(body);
    await user.save();
    let token = await user.generateAuthToken();
    //debugger 
    res.header('x-auth', token)
    .send({
      data: user,
      token: token
    });
  }catch(err){
    res.status(500).send({
      error: "Failed to create user: " + err
    });
  };
});

//Private user page
api.get('/users/me', auth, (req,res)=>{
  //using auth middleware we extract user 
  //and append it to request in user prop
  //we also append token property
  res.send({data: req.user });
});

// LOGIN point
api.post('/login', async (req,res)=>{
  let body = {
    email: req.body.email,
    password: req.body.password
  }, userFound;
  //debugger
  //find user by credentials
  try{
    let user = await User.findByCredentials(body);
    let token = await user.generateAuthToken();
    //send response with token
    res.header('x-auth', token)
    .send({
      data: userFound,
      token: token
    });
  }catch(e){
    res.status(500).send({
      error: "Failed to log you in",
      data: e
    })
  };
});

//LOGOUT point
//removes token from user mongodb
api.delete("/logout",auth, async (req,res)=>{
  try{
    //remove token
    await req.user.removeToken(req.token);
    //send confirmation
    res.status(200).send({
      data: "User logged out!"
    });
  }catch(e){
    res.status(500).send({
      error:"Logout failed",
      data: err
    })
  };
})

api.listen(3000,()=>{
  console.log("Started on 3000");
});

module.exports = {api};
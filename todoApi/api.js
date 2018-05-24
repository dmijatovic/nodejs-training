//get environment variables
let env = process.env.NODE_ENV || 'development';

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

//delete todo by id
api.delete('/todos/:id',(req,res)=>{
   //get id from params
  let id = req.params.id;
  if (ObjectID.isValid(id)){
    ToDo.findByIdAndRemove(id).then((todo)=>{
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
api.patch('/todos/:id',(req,res)=>{
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
api.post('/users',(req,res)=>{
  let body = {
    email: req.body.email,
    password: req.body.password,
  }
  //debugger 
  let user = new User(body);
  user.save().then(()=>{
    //generate token
    return user.generateAuthToken();
  }).then((token)=>{
    //debugger 
    res.header('x-auth', token)
    .send({
      data: user,
      token: token
    });
  }).catch((err)=>{
    res.status(500).send({
      error: "Failed to create user: " + err
    });
  });
});

//Private user page
api.get('/users/me', auth, (req,res)=>{
  //using auth middleware we extract user 
  //and append it to request in user prop
  //we also append token property
  res.send({data: req.user });
});

// LOGIN point
api.post('/login',(req,res)=>{
  let body = {
    email: req.body.email,
    password: req.body.password
  }, userFound;
  //debugger
  //find user by credentials
  User.findByCredentials(body)
  .then((user)=>{
    userFound = user;
    //if user found - generate token
    return user.generateAuthToken();
  })
  .then((token)=>{
    //send response with token
    res.header('x-auth', token)
    .send({
      data: userFound,
      token: token
    });
  })
  .catch((e)=>{
    res.status(501).send({
      error: "Failed to log you in",
      data: e
    })
  });
});

//LOGOUT point
//removes token from user mongodb
api.delete("/logout",auth,(req,res)=>{
  req.user.removeToken(req.token)
  .then(()=>{
    res.status(200).send({
      data: "User logged out!"
    });
  })
  .catch((err)=>{
    res.status(500).send({
      error:"Logout failed",
      data: err
    })
  });
})

api.listen(3000,()=>{
  console.log("Started on 3000");
});

module.exports = {api};

const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const secret= require('../middleware/.secret');

//mongoose todo model
const ToDo = mongoose.model('ToDo',{
  text:{
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  completed:{
    type: Boolean,
    default: false
  },
  completedAt:{
    type: Number,
    default: null
  },
  creator:{
    required: true,
    type: mongoose.Schema.Types.ObjectId 
  }
});


//Schema enables methods on model
const UserSchema = new mongoose.Schema({
    name:{
      type: String,
      required: false,
      minlength: 3,
      trim: true
    },
    email:{
      type: String,
      required: true,
      minlength: 3,
      trim: true,
      unique: true,
      validate:{
        /* long
        validator:(value)=>{
          return validator.isEmail(value);
        },*/
        validator: validator.isEmail,
        message:"{VALUE} is not valid email"
      } 
    },
    password:{
      type: String,
      required: true,
      minlength: 6
    },
    tokens:[{
      access:{
        type: String,
        required: true 
      },
      token:{
        type: String,
        required: true 
      }
    }]
})
// append custom methods to schema
// no arrow function: to bind to parent
UserSchema.methods.generateAuthToken = function(){
  let user = this, access = 'auth';
  //create new token  
  let token = jwt.sign({
      _id: user._id.toHexString(), access
    }, secret).toString();
  //append token to user props
  user.tokens = user.tokens.concat([{access, token}]);
  //save 
  return user.save().then(()=>{
    //return token
    return token;
  });
};



//overwrite default toJSON schema function with custom
//one in order to control properties extracted
//here we send only _id and email back from mongodb
UserSchema.methods.toJSON = function(){
  let user = this;
  //let userObject = user.toObject();
  return {
    _id: user._id,
    email: user.email,
    //password: user.password
  }
};

//remove token at logout
UserSchema.methods.removeToken = function(token){
  let user = this;
  //$pull is going to
  //remove token from the array of tokens
  return user.update({
    $pull:{
      tokens:{
        token: token
      }
    }
  });
};

// custom static methods on User schema
// find user by token
UserSchema.statics.findByToken = function(token){
  let User = this;
  let decoded;
  //debugger
  return new Promise((res,rej)=>{
    try{
      //decode jwt token
      decoded = jwt.verify(token, secret);
      //use id from decoded jwt to find user in db
      let user = User.findOne({
        '_id': decoded._id,
        'tokens.token': token,
        'tokens.access': 'auth'
      });
      //return user 
      res(user);
    }catch(e){
      //reject with error
      //mostly invalid token from jwt.verify
      rej(e);
      //return null;
    }
  });
}
// find user by token
UserSchema.statics.findByCredentials = function({email, password}){
  let User = this;
  //debugger
  return new Promise((res,rej)=>{
    //find user with that email
    User.findOne({email: email})
    .then((user)=>{
      if (user){
        bcrypt.compare(password, user.password, (err, resp)=>{
          if (resp){
            res(user);
          }else{
            rej("Password incorrect")
          }
        });
      }else{
        //reject when user not found
        rej("User not found!");
      }
    })
    .catch((e)=>{
      //reject with error
      //mostly invalid token from jwt.verify
      rej(e);
      //return null;
    })
  });
}

//use middleware to hash password before saving
//we use function keywoard to have reference to this
//we ALWAYS call next() to let the process continue  
UserSchema.pre('save',function(next){
  //get reference to user object
  let user = this;

  //check if pasword is modified
  //we need to enript pass once else it 
  if (user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{

      if (err) throw Error(err);
      
      bcrypt.hash(user.password, salt,(err,hash)=>{
        if (err) throw Error(err);

        //save hashed password
        user.password = hash;
        //continue process
        next();
      });
    });    
  }else{
    //continue process
    next();
  }
});

//mpngoose User model
const User = mongoose.model('User', UserSchema);

module.exports={
  ToDo, User 
}




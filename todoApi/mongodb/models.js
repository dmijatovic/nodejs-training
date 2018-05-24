
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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
      require: true,
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
  let user = this, access = 'auth', secret="abc123";
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
    email: user.email
  }
}

//mpngoose User model
const User = mongoose.model('User', UserSchema);

module.exports={
  ToDo, User 
}




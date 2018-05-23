
const mongoose = require('mongoose');
const validator = require('validator');

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


//mpngoose User model
const User = mongoose.model('User',{
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
});

module.exports={
  ToDo, User 
}




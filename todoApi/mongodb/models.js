
const mongoose = require('mongoose');

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

const User = mongoose.model('User',{
  name:{
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  email:{
    type: String,
    required: true,
    minlength: 3,
    trim: true
  }
});

module.exports={
  ToDo, User 
}




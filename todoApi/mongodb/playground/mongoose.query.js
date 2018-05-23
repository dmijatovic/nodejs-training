const { ObjectID } = require('mongodb');
const { mongoose } = require('../mongoose');
const { ToDo, User } = require('../models');

//let id = 


// //REMOVE DATA
// ToDo.remove().then((d)=>{

// });


// //REMOVE ONE BY TEXT
// ToDo.findOneAndRemove({text:'This is my message'}).then((d)=>{

// });

//remove by id
// let id='1234234234';
// ToDo.findByIdAndRemove(id).then((todo)=>{
//   if (todo){
//     console.log("Todo removed...", todo);
//   } else {
//     console.log("Todo NOT FOUND!...", id);
//   }
// },(e)=>{
//   console.error("Remove failed...", e);
// });

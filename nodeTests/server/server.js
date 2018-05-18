
const express = require('express');
const app = express();


app.get('/', (req,res)=>{
  res.send("It works");
});


app.get('/user', (req, res)=>{
  res.send({
    name: "Dusan",
    age: 25
  })
});

app.listen(3000, ()=>{
  console.log("server on 3000");
});

module.exports.app = app;


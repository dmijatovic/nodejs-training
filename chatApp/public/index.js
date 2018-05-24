
//init socket.io library
//it should be loaded before index.js
let socket = io();

socket.on('connect',()=>{  
  console.log("Connected to socket server");
});

socket.on('disconnect',()=>{
  console.log("Connection closed");
})

//console.log("index js file up!")
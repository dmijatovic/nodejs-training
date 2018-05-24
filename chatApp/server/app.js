
const PORT = process.env.PORT || 3000;

const path = require('path');
const public = path.join(__dirname, '../public');
const express = require('express');

const socketio = require('socket.io');
const http = require('http');
const app = express();

//setup http server
const server = http.createServer(app);
//setup socket
const io = socketio(server);

//define public static folder
app.use(express.static(public));


io.on('connection',(socket)=>{
  console.log("Client...connected");

  socket.on('disconnect',()=>{
    console.log("Client...disconected");
  });
});




server.listen(PORT,()=>{
  console.log("Server on...", PORT)
})
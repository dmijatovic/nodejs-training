
const PORT = process.env.PORT || 3000;

const path = require('path');
const public = path.join(__dirname, '../public');
const express = require('express');

const utils = require('./utils');

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

  //great new user
  socket.emit("newMessage",{
    from:'admin@chatMaster.com',
    body:'Welcome to chatMASTER'
  });

  socket.broadcast.emit("newMessage",{
    from: 'admin@chatMASTER.com',
    body: 'New user joined chat :-)'
  });


  socket.on('createMessage',(data)=>{

    console.log("Share message...", data);
    
    //create message with dateTimeStamp
    let message=utils.generateMessage(data)

    //emit message to all clients;
    io.emit('newMessage', message);
    
    //emit message to everybody except the owner
    //socket.broadcast.emit('newMessage',message);
  });


  socket.on('disconnect',()=>{
    console.log("Client...disconected");
  });

});



server.listen(PORT,()=>{
  console.log("Server on...", PORT)
})
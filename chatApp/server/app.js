
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

  //greet new user after connected
  socket.emit("newMessage",
    utils.generateMessage({
      from:'admin@chatMaster.com',
      body:'Welcome to chatMASTER'
    })
  );
  //send notification to everyone (except user)
  //about new user joining
  socket.broadcast.emit("newMessage",
    utils.generateMessage({
    from: 'admin@chatMASTER.com',
    body: 'New user joined chat :-)'
    })
  );

  //listen when client request to create new message
  //server shares this message with everyone (incl. sender)
  socket.on('createMessage',(data, callback)=>{
    console.log("Share message...", data);
    
    //create message with dateTimeStamp
    let message = utils.generateMessage(data)
    //send message if all went well
    callback({status:200, message:'Thi is completely OK!'});
    //emit message to all clients;
    io.emit('newMessage', message);
    //emit message to everybody except the owner
    //socket.broadcast.emit('newMessage',message);
  });

  //listen when client requests location message
  socket.on('createLocationMsg',(geoloc, callback)=>{
    console.log("createLocatoinMsg...", geoloc);
    //create message with dateTimeStamp
    let message = utils.generateMessage(geoloc)
    //send message if all went well
    callback({status:200, message:'Thi is completely OK!'});
    //emit message to all clients;
    io.emit('newMessage', message);
  });


  socket.on('disconnect',()=>{
    console.log("Client...disconected");
  });

});


server.listen(PORT,()=>{
  console.log("Server on...", PORT)
})
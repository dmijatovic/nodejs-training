/**
 * ChatMASTER main class 
 * 
 * v.0.0.1 mei 2018
 */
export class chatMaster{
  //socket = io();
  constructor(){
    //debugger
    this.socket = io();
    this.connect();
  }
  /**
   * Connect to websocket server
   */
  connect(){
    //default socket connect event
    this.socket.on('connect',()=>{
      console.log("Connected to server");
      this.listenForEvents();
    });
  }
  /**
   * Listen for events defined
   */
  listenForEvents(){
    //listen for new message
    this.socket.on('newMessage',(data)=>{
      this.newMessage(data);
    });

    //listen for disconnect
    this.socket.on('disconnect',()=>{
      this.disconnect();
    });
  }
  /**
   * Receving new message from server
   * @param data.from: string
   * @param data.body: string
   * @param data.createdAt: date ISO string 
   */
  newMessage(data){
    console.log("New message...", data);
  }
  /**
   * Send new message/chat.post to server
   * @param data.from: string, sender
   * @param data.body: string, message body 
   */
  createMessage(data){
    this.socket.emit('createMessage',data);
  }
  disconnect(){
    console.log("Connection closed by server");
  }
}
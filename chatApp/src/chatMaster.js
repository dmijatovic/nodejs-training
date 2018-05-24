/**
 * ChatMASTER main class 
 * 
 * v.0.0.1 mei 2018
 */
export class chatMaster{
  //socket = io();
  constructor({inputId, submitId, msgLstId}){
    //debugger
    //init sockets
    this.socket = io();
    //get reference to html elements
    this.messageBody = document.getElementById(inputId);
    this.submitBtn = document.getElementById(submitId);
    this.msgLst = document.getElementById(msgLstId);
    //connect
    this.connect();
  }
  /**
   * Connect to websocket server
   */
  connect(){
    //default socket connect event
    this.socket.on('connect',()=>{
      console.log("Connected to server");
      this.listenForSocketEvents();
      this.listenForHtmlEvents();
    });
  }
  /**
   * Listen for events defined
   */
  listenForSocketEvents(){
    //listen for new message
    this.socket.on('newMessage',(data)=>{
      //this.newMessage(data);
      this.appendMessageToList(data);
    });

    //listen for disconnect
    this.socket.on('disconnect',()=>{
      this.disconnect();
    });
  }
  listenForHtmlEvents(){
    //listen to submit button
    this.submitBtn.addEventListener('click',()=>{
      this.submit();
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
    this.socket.emit('createMessage',data, (err)=>{
      console.log("Got from server...", err);
    });
  }
  /**
   * Append new message as list item to ol
   * @param data.from: string
   * @param data.body: string
   * @param data.createdAt: date ISO string 
   */
  appendMessageToList(data){
    //debugger
    let li = document.createElement('li');
    li.innerHTML = JSON.stringify(data);
    this.msgLst.appendChild(li);
  }
  submit(){
    console.log("I want to submit!");
    let msg = {
      from: 'Me',
      body: this.messageBody.value
    }
    debugger
    this.createMessage(msg); 
  }
  disconnect(){
    console.log("Connection closed by server");
  }
}
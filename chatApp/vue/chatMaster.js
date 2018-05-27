
let chatMaster = new Vue({
  el:'#chatMaster',
  /**
   * After vue instance is created
   */
  created(){
    //connection to socket server
    this.createSocket();
  },
  data:{
    titles:{
      app:"ChatMASTER",
      conversation:"Your all messages"
    },
    //socket.io object
    socket:{
      //reference to socket.io
      io: null,
      //connection flag
      connected: false 
    },
    chats:[],
    /**
     * Single chat message object/format
     * used for new messages
     */
    message:{
      from: "Me",
      body: "This is content",
      createdAt: null //created by server
    }
  },
  methods:{
    //create and connect to sockets server
    createSocket(){
      //init socket.io
      this.socket.io = io();
      this.socket.io.on('connect',()=>{
        this.socket.connected = true;
        console.log("Socket connected to server...");
        //set event listeners
        this.listenForSocketEvents();
      });
    },
    listenForSocketEvents(){
      //this.socket.cnn.on("")
      //console.log("ListenForSocketEvents...");
      //listen for disconnected event from server
      this.socket.io.on("disconnect",()=>{
        this.cnnDisconnect();
      });

      //listen for new message
      this.socket.io.on('newMessage',(data)=>{
        //console.log("New message...",data)
        this.appendMessage(data);
      });
    },
    cnnDisconnect(){
      console.log("Server disconnected...");
      //remove connection 
      this.socket.connected = false;
      this.socket.io.close();
      this.socket.io = null;
    },
    appendMessage(d){
      this.chats.push(d);
    },
    createMessage(){
      //console.log("Send message...")
      if (this.message.body.length > 0){
        //send message to server
        this.socket.io.emit('createMessage',{
          from: this.message.from,
          body: this.message.body
        },(res)=>{
          //console.log("Got back from server...", err);
          if (res.status == 200){
            //remove message from input (body)
            this.message.body = '';
          }else{
            console.error(res.status, " - ", res.message);
          }
        });
      }else{
        console.error("No message to create!")
      }
    }
  },
  /**
   * Before vue instance is destroyed
   */
  beforeDestroy(){
    console.log("Vue before destroy...");
    //remove socket reference
    this.socket = null;
  }
});

export default chatMaster;
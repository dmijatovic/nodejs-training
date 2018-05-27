
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
      conversation:"Your messages"
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
      from: "Dusan",
      body: "",
      location:{
        lat:null,
        lng:null
      },
      createdAt: null //created by server
    },
    userName:"Dusan",
    shareLocation:false,
    /**
     * Here we load notifications
     */
    notification:{
      msg:"Welcome to chatMASTER!!!",
      type:'alert-primary'
    }
  },
  computed:{
    /*
    toggleLocation(){
      //toggle location
      this.shareLocation = !this.shareLocation;
      console.log("Computed location...", this.shareLocation);
      return this.shareLocation;
    }*/
  },
  watch:{
    /**
     * Watch changes in shareLocation flag
     * and add/remove location props to message
     * @param val: boolean 
     */
    shareLocation(val){
      //console.log("Watch...shareLocation...", val);
      if (val){
        this.setLocation();
      }else{
        this.removeLocation();
      }
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
        console.log("New message...",data)
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
        //debugger
        this.socket.io.emit('createMessage',{
          from: this.message.from,
          body: this.message.body,
          location: this.message.location
        },(res)=>{
          //console.log("Got back from server...", err);
          if (res.status == 200){
            //remove message from input (body)
            this.message.body = '';
          }else{
            this.logServerResponse(res);
          }
        });
      }else{
        console.error("No message to create!")
      }
    },
    setLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((res,err)=>{
          if(err){
            console.error("Geolocation error...", err);
            this.removeLocation();
          }else{
            //console.log("Georlocation...", res);
            //debugger
            this.message.location.lat = res.coords.latitude;
            this.message.location.lng = res.coords.longitude;
          }          
        });
      }else{
        console.error("Geolocation support MISSING");
        this.removeLocation();
      }
    },
    /**
     * Remove location from message
     */
    removeLocation(){
      this.message.location.lat = null;
      this.message.location.lng = null;
    },
    /* oldone
    sendLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition((res,err)=>{
          if(err){
            console.error("Geolocation error...", err);
          }else{
            //console.log("Georlocation...", res);
            this.createLocationMsg(res);
          }          
        });
      }else{
        console.error("Geolocation support MISSING");
      }
    }, */
    /**
     * Send location to server to share with others
     * @param geoloc: geolocation object provided by browser 
     
    createLocationMsg(geoloc){
      this.socket.io.emit('createLocationMsg',{
        from:"Dusan",
        body: geoloc.latitude + "," + geoloc.longitude
      },(res)=>{
        if(res.status==200){
          
        }else{
          this.logServerResponse(res); 
        }
      });
    },*/
    /**
     * Function to scroll to bottom of the page?!?
     */
    scrollToBottom(){
      let clientHeight = window.clientHeight();
    },
    /**
     * Log response received from server 
     * use mainly to log ERRORS
     * @param res.status: number, 200 = OK
     * @param res.message: string, error message 
     */
    logServerResponse(res){
      console.error(res.status, " - ", res.message);
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
/**
 * chatMASTER main file
 * 
 * v0.0.1 May 2018
 */
 
import Vue from 'vue';

//import main styles file
import './index.scss';

/*
//import main chat class
import { chatMaster } from './chatMaster';

//create new chatMASTER object
//pass html object ids for reference
let chat = new chatMaster({
  inputId: 'chat-body',
  submitId: 'submit-chat',
  msgLstId: 'message-list'
});
*/

let app = new Vue({
  el:'#vue-app',
  data:{
    message:'This is message'    
  },
  template:`
    <h1>Test this</h1>
  `
})

//console.log(Vue);


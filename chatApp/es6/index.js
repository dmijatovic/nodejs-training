/**
 * chatMASTER ES6 main file
 * 
 * v0.0.1 May 2018
 */

//bootstrap 4
import 'bootstrap';

//import main styles file
import './index.scss';

//import main chat class
import { chatMaster } from './chatMaster';

//create new chatMASTER object
//pass html object ids for reference
let chat = new chatMaster({
  inputId: 'chat-msg-body',
  submitId: 'submit-chat',
  msgLstId: 'message-list'
});


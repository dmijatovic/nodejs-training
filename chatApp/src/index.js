/**
 * chatMASTER main file
 * 
 * v0.0.1 May 2018
 */
import { chatMaster } from './chatMaster';

//create new chatMASTER object
let chat = new chatMaster();

//create new message
chat.createMessage({
  from:'Me',
  body: "This is my auto message"
})



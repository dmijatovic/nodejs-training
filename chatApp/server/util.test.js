
let expect = require('expect');

let utils = require('./utils');

describe('util.generateMessage',()=>{
  let msg={
    from: "me",
    body: "body"
  }, test = utils.generateMessage(msg);

  it('should return message from value',()=>{    
    expect (test.from).toBe(msg.from);
  });

  it('should return message body value',()=>{    
    expect (test.body).toBe(msg.body);
  });

  it('should return createdAt value',()=>{    
    expect (test.createdAt).toBeTruthy();
  });

});

const expect = require('expect');
const rewire = require('rewire');

let app = rewire('./app.js');

describe('App',()=>{
  //create spy object
  let db={
    writeDB: expect.createSpy()
  };
  //place spy object into the app module
  app.__set__("db",db);

  it('should call the spy',()=>{
    let spy = expect.createSpy();
    spy();
    expect(spy).toHaveBeenCalled();
  });

  it('should call the spy with data',()=>{
    let spy = expect.createSpy();
    spy('Adres', 34);
    expect(spy).toHaveBeenCalledWith('Adres',34);
  });

  it('should call writeDB with values',()=>{
    let email="email.com", pass="12345";

    app.handleSignup(email, pass);

    expect(db.writeDB).toHaveBeenCalledWith({email, pass});

  });


});
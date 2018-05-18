
let db = require('./db');

module.exports={
  handleSignup(email, pass){
    db.writeDB({email, pass});
  }
}
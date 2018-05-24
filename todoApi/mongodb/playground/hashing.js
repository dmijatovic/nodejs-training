
const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let message = "I am user";
let hash = SHA256(message).toString();
let secret = "ThisIsMySecret1233423423423412389234asdasd234sfser";

console.log('message...', message);
console.log('hash...', hash);

let data={
  id: 4
}

//create slated hash token
let token={
  data,
  hash: SHA256(JSON.stringify(data) + secret).toString()
}

// MAN IN MIDDLE ATTEMPT
// note! they should not have secret
token.data.id=5;
token.hash = SHA256(JSON.stringify(data)).toString();


let resultHash = SHA256(JSON.stringify(token.data) + secret).toString();

if (resultHash === token.hash){
  console.log("Data is valid")
} else {
  console.error("Data was changed!!!")
}

//JWT - JsonWebToken implements this stadard, hashing and salting

//sign data into token 
let jwtoken = jwt.sign(data, secret); 
console.log("jwt...", jwtoken);

//verify token
let decoded = jwt.verify(jwtoken, secret)
console.log("decoded...", decoded);


//BCRYPTJS encripting passwords
let pass = 'pasword123';
let hashedPass;

//generate salt
bcrypt.genSalt(10, (err,salt)=>{
  //generate hahed pass using generated salt
  bcrypt.hash(pass,salt, (err, hash)=>{
    hashedPass = hash;
    console.log("hashedPass...", hashedPass);
  });
});

//generated example taken from previous console log.
hashedPass = "$2a$10$KdrqjamVHC7KY1TZB7bRwuqKfs6D6i1qcXOWA4IPF8PaaHGVfyHK6";
//validate hashed pass against pass
bcrypt.compare(pass, hashedPass, (err,res) =>{
  console.log("hash valid...", res);
});







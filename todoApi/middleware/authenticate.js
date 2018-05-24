
const { User } = require ('../mongodb/models');

const authenticate = (req,res,next) =>{
  //debugger
  let token = req.header('x-auth');
  //debugger 
  //if token provided
  if (token){
    //find user by token - custom static function 
    //we defined in model -- see mongodb/models.js
    User.findByToken(token)
    .then((user)=>{
      //debugger
      //if user object provided 
      if (user){
        //add user to request 
        req.user = user;
        req.token = token;
        //proceed to next operation
        next();
      }else{
        //reject - it will be catched in next block
        return Promise.reject("User not found");
      }
    })
    .catch((e)=>{
      //token errors are catched here
     res.status(401).send({
        error: "401 - Authorization failed!",
        data: e
      });
    });
  } else {
    res.status(401).send({
      error: "401 - Not authorized!",
      data:'jwt token not provided in request header as x-auth property'
    })
  }
};

module.exports = authenticate;
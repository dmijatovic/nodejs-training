
/**
 * Callback function signiture
 * @param {*} id 
 * @param {*} callback 
 */
let getUser = (id, callback) => {

  setTimeout(()=>{
    
    callback({
      id: id,
      name: "Some name"
    });

  },1000);

};

getUser(1234, (user)=>{
  console.log(user);
});


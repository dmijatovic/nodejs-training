
console.log("Arrow function playground started");


//short notation arrow functions
// when one argument no () is required
// return is assumed when {} not console.log(arguments);used 
let square = x => x * x;

console.log(square(9));


let user = {
  name: 'Dusan',
  /**
   * Arrow function do not bind this to parent object 
   */
  sayHi: () => {
    //does not has arguments
    console.log(arguments);
    //does not bind parent to this keywoard
    console.log(`Hi. I am ${this.name}`);
  },
  /**
   * Alternative function syntax on object bound keywoard this to parent object
   * It also has arguments of regulair function 
   */
  sayHiAlt(){
    //it has arguments 
    console.log(arguments);
    //it binds to this
    console.log(`Hi. I am ${this.name}`);
  }
}

user.sayHi(1,2,3);
user.sayHiAlt(1,2,3);
module.exports={
  add(a,b){
    return a + b;
  },
  square(a){
    return a * a;
  },
  asyncAdd(a,b, callback){
    setTimeout(()=>{
      callback(a + b);
    },1000);
  }
}
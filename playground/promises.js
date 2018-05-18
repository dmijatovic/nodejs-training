

const asyncAdd = (a, b) =>{
  return new Promise((resolve,reject)=>{

    setTimeout(()=>{
      if (typeof(a)==='number' && typeof(b)==='number'){
        resolve( a + b );
      }else{
        reject('Argument must be a number');
      }     
    });

  });
}
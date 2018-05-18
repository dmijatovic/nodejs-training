const expect = require('expect');
const utils = require('./utils');

describe('Utils', ()=>{
  
  it ('should add two numbers',()=>{
    let res = utils.add(3,2);
    expect(res).toBe(5)
      .toBeA('number');
  });
  
  it('should square a number',()=>{
    let res = utils.square(3);
    expect(res).toBe(9)
      .toBeA('number')
  });
  
  it('should expect some values',()=>{
    //expect(12).toNotBe(11);
    let res = {
      name:"Dusan",
      age:25
    }
    //this works because we use same object
    expect(res).toBe(res);
    //this won't work because it is not same object 
    //expect(res).toBe({name:"Dusan"});
    //this will works with objects
    //expect(res).toEqual({name:"Dusan"});
    //expect(res).toInclude({age:23});
  });

  describe('#async',()=>{    
    it('should test async function',(done)=>{
      utils.asyncAdd(3,2,(res)=>{
        expect(res).toBe(5);
        //call moca
        done();
      })
    })
  });

});




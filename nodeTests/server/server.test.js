const request = require('supertest');
const expect = require('expect');

let app = require('./server').app;


describe('Server',()=>{

  describe("GET /", ()=>{
    it ('should return it works from root', (done)=>{
      request(app)
        .get('/')
        .expect('It works')
        .end(done);
    });  
  })
    
  describe("GET /user",()=>{
    it('should return users object',(done)=>{
      request(app)
        .get('/user')
        .expect(200)
        .expect((res)=>{
          expect(res.body).toInclude({
            name: 'Dusan',
            age: 25
          })
        })
        .end(done)
    });
  });  
});



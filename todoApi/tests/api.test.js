const expect = require('expect');
const request = require('supertest');

const { api } = require('../api');
const { ToDo } = require('../mongodb/models');
const todos = require('./todos');

/**
 * Execute this code before each test
 * we remove all todo items from mongodb
 * before each test
 */
beforeEach((done)=>{
  //remove all records
  ToDo.remove({})
    .then(()=>{
      //insert dummy todos
      return ToDo.insertMany(todos)
    })
    .then(()=>done());
});

/**
 * Test todos api route
 */
describe('POST /todos',()=>{

  it('should have 3 todo items in mongodb',(done)=>{
    ToDo.find({}).then((todos)=>{
      expect(todos.length).toBe(3);
      //console.log(todos);
      done();
    });
  });

  it('should create new todo', (done)=>{
    let txt = "Test todo";
    request(api)
      .post('/todos')
      .send({"text": txt})
      .expect(200)
      .expect((resp)=>{
        expect(resp.body.text).toBe(txt);        
      })
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
  });

  it('should FAIL when NULL STRING provided in text',(done)=>{
    request(api)
      .post('/todos')
      .send({"text":""})
      .expect(400)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
  });

  it('should FAIL when EMPTY OBJECT provided',(done)=>{
    request(api)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
  });
});

describe("GET /todos",()=>{
  it('should return 200 OK',(done)=>{
    request(api)
      .get('/todos')
      .expect(200)
      .end((err,resp)=>{
        if (err){
          done(err)
        }else{
          done();
        }
      })
  })
  it('should get 3 test todos',(done)=>{
    request(api)
      .get('/todos')
      .expect((resp)=>{
        expect(resp.body.data.length).toBe(3);
      })
      .end((err,resp)=>{
        if (err){
          done(err)
        }else{
          done();
        }
      })
  })
});
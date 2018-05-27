const expect = require('expect');
const request = require('supertest');

const { api } = require('../api-async');
const { ToDo, User } = require('../mongodb/models');
const { todos, populateTodos, users, populateUsers } = require('../seed');

/**
 * Execute this code before each test
 * we remove all todo items from mongodb
 * before each test and add 3 dummies
 */
beforeEach((done)=>{
  populateTodos(done)
});
beforeEach((done)=>{
  populateUsers(done)
});

/**
 * Test todos api route
 */
describe('ASYNC POST /todos',()=>{
  
  it('should create new todo', (done)=>{
    let txt = "Test todo";
    request(api)
      .post('/todos')
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
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
      .set('x-auth', users[0].tokens[0].token)
      .expect((resp)=>{
        expect(resp.body.data.length).toBe(2);
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

describe("GET /todos/:id",()=>{

  it ('should return 404 when invalid id provided',(done)=>{
    //done();
    request(api)
      .get('/todos/12345')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
  });

  it ('should return todo data when valid id provided',(done)=>{
    var id = todos[0]._id;
    request(api)
    .get(`/todos/${id}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(200)
    .expect((resp)=>{
      //console.log(resp.body);
      expect(resp.body.data.text).toBe(todos[0].text);
    })
    .end((err,resp)=>{
      if(err){
        done(err);
      }else{
        done();
      }
    });
  });


  it ('should NOT return todo from different user',(done)=>{
    var id = todos[2]._id;
    request(api)
    .get(`/todos/${id}`)
    .set('x-auth', users[0].tokens[0].token)
    .expect(404)
    .end((err,resp)=>{
      if(err){
        done(err);
      }else{
        done();
      }
    });
  });

});


describe("DELETE /todos/:id",()=>{

  it ('should return 404 when invalid id provided',(done)=>{
    //done();
    request(api)
      .delete('/todos/12345')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
  });

  it ('should DELETE todo when valid id provided',(done)=>{
    ToDo.findOne().then((data)=>{
      var id = data._id;
      request(api)
      .delete(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((resp)=>{
        //console.log(resp.body);
        expect(resp.body.data.text).toBe(data.text);
      })
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
    });
  });
});


describe("PATCH /todos/:id",()=>{

  it ('should return 404 when invalid id provided',(done)=>{
    //done();
    request(api)
      .patch('/todos/12345')
      .set('x-auth', users[0].tokens[0].token)
      .expect(404)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
  });

  it ('should UPDATE todo when valid id provided',(done)=>{
    
    let body={completed:true, text:"This is just test"};
    
    ToDo.findOne().then((data)=>{
      var id = data._id;
      request(api)
      .patch(`/todos/${id}`)
      .set('x-auth', users[0].tokens[0].token)
      .send(body)
      .expect(200)
      .expect((resp)=>{
        //console.log(resp.body);
        expect(resp.body.data.text).toBe(body.text);
        expect(resp.body.data.completed).toBe(true);
        expect(resp.body.data.completedAt).toBeGreaterThan(1000000);
      })
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      });
    });
  });
});


describe("GET /users/me",()=>{
  it ('should return authenticated user when valid x-auth token provided',(done)=>{
    request(api)
      .get('/users/me')
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .expect((resp)=>{
        //check user email matches
        expect(resp.body.data.email).toBe(users[0].email)
      })
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });

  it ('should return 401 when x-auth token NOT provided',(done)=>{
    request(api)
      .get('/users/me')
      //.set('x-auth', users[0].tokens[0].token)
      .expect(401)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });

  it ('should return 401 when INCORRECT x-auth token provided',(done)=>{
    request(api)
      .get('/users/me')
      .set('x-auth', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c")
      .expect(401)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });
});



describe('POST /users',()=>{
  
  let email="email@google.com", pass="123password";

  it ('should create a user and return x-auth token in the header', 
    (done)=>{
      
    request(api)
      .post('/users')
      .send({email: email, password: pass})
      .expect(200)
      .expect((resp)=>{
        //console.log(resp.headers);
        expect(resp.headers['x-auth']).toBeTruthy();
      })
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });

  it ('should save hashed password in database (not provided one)', (done)=>{
      
    request(api)
      .post('/users')
      .send({email: email, password: pass})
      .expect(200)
      .end((err)=>{
        if(err){
          done(err);
        }else{
          User.findOne({email: email})
          .then((user)=>{
            //console.log(user.password);
            expect(user.password).not.toBe(pass);
            done();
          });
        }
      })
  });

  it('should return 500 error when PASSWORD not provided',(done)=>{
    request(api)
      .post('/users')
      .send({email: email, password:''})
      .expect(500)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
  })

  it('should return 500 error when EMAIL already used',(done)=>{
    request(api)
      .post('/users')
      .send({email: users[0].email, password:'1234sdsd'})
      .expect(500)
      .end((err,resp)=>{
        if(err){
          done(err);
        }else{
          done();
        }
      })
  })
})

describe('POST /login',()=>{
  //let user = users[0];
  it('should provide x-auth token on login',(done)=>{
    request(api)
      .post("/login")
      .send({ email: users[0].email, password: users[0].password })
      .expect(200)
      .expect((resp)=>{
        expect(resp.headers['x-auth']).toBeTruthy();
      })
      .end((err,resp)=>{
        //console.log(resp)
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });

  it('should NOT provide x-auth token on INCORRECT login',(done)=>{
    request(api)
      .post("/login")
      .send({ email: users[0].email, password: users[0].password + "aaa"})
      .expect(500)
      .expect((resp)=>{
        expect(resp.headers['x-auth']).toBeFalsy();
      })
      .end((err,resp)=>{
        //console.log(resp)
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });


});


describe('DELETE /logout',()=>{

  it ('should return 401 if not logged in',(done)=>{
    request(api)
      .delete("/logout")
      .expect(401)
      .end((err,resp)=>{
        //console.log(resp)
        if(err){
          done(err);
        }else{
          done();
        }
      })
  });

  it ('should return 200 and remove token on successful logout',(done)=>{
    request(api)
      .delete("/logout")
      .set('x-auth', users[0].tokens[0].token)
      .expect(200)
      .end((err)=>{
        //console.log(resp)
        if(err){
          done(err);
        }else{
          User.findOne({email: users[0].email}).then((user)=>{
            expect(user.tokens.length).toBe(0);;
            done();
          })
          .catch((e)=>{
            done(e);
          })          
        }
      })
  })

});

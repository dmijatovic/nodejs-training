const fs = require('fs');
const express = require('express');
//handlebars templating engine
//http://handlebarsjs.com/
const hbs = require('hbs');

const app = express();
//define partials location
hbs.registerPartials('./views/partials');
//set handlebars as viewengine
app.set('view_engine','hbs');

//--------------------------------
//handlebars helper functions
hbs.registerHelper('getFooter',()=>{
  return `Copyright ${new Date().getFullYear()}`;
});
//transform values from variable
hbs.registerHelper('upperCaseIt',(text)=>{
  return text.toUpperCase;
});
//---------------------------------
//MIDDLEWARE
//custom logger 
app.use((req,res,next)=>{

  let log = `${new Date().toISOString()} ${req.method} ${req.url}`;

  fs.appendFile('server.log',log + '\n', (err)=>{
    if(err){
      console.log(err);
    }
  });

  //call next method in line 
  next();
});

//maintanance middleware
//used to block complete site/app
/*
app.use((req,res,next)=>{
  res.render('maintanance.hbs');
});
*/

//-------------------------------------
//ROUTES - after middleware 

//define static folder
app.use(express.static('./public'));

app.get('/home', (req, res) =>{
  res.render('home.hbs',{
    pageTitle: 'Home page',
    pageBody:"Welcome to home page!"
  })
});

app.get('/about', (req, res) =>{
  res.render('about.hbs',{
    pageTitle: 'About page',
    pageBody:"Welcome to about page!"
  })
});

app.get('/error', (req, res) =>{
  res.send({
    error:"Failed to load",
    status: 404
  });
});





app.listen(8080,()=>{
  console.log("Server on port 8080");
});
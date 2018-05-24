
# Docker containers

## Docker MongoDB

This app use mongodb as docker container. In order to use mongo you need to have a docker installed on your local machine. Then you can pull official mongoDB docker image from [dockerhub](https://hub.docker.com/_/mongo/)

To pull image
```bash
  # pull docker image from docker hub
  docker pull mongo

  # run first time to add mongoDB definitions to docker container list
  # name of mongodb instance is mongodb-1
  npm run mongo:run

  # to stop mongo instance
  npm run mongo:stop

  # to start mongodb-1 instance
  npm run mongo:start

  # to remove mongodb-1 from active docker list
  npm run mongo:remove

  # to examine active docker images 
  docker ps

  # to examine all instances 
  docker ps -a

  # to view all downloaded images
  docker images

  # to remove docker image from local machine 
  docker rmi <image id> 
```

## Docker Mongo-Express
 
This is front-end [mongo db management tool](https://hub.docker.com/_/mongo-express/). It need be linked to mongodb docker image.


```bash
  # pull image to local machine
  docker pull mongo-express

  #start mongodb docker instance to link to this container
  npm run mongo:link

  #start mongo-express with link reference to mongo container we just started with previous command
  #use this for first time
  npm run mongo:man:run

  # start mongo-express after first time
  # ENSURE mongodb container is running before calling this function
  # it runs in interactive mode, when bash is closed it will stop container
  npm run mongo:man:start

  # stop mongo-express manager 
  npm run mongo:man:stop

  # remove
  npm run mongo:man:rm

```

# Authentication

## Mongoose email validation

See [docs](http://mongoosejs.com/docs/validation.html) and install validator lib `npm i validator --save`


## Hashing

SHA256 used from lib crypto-js module. See example in playground/hashing.js

## JWT
Using jwt for validation `npm i --save jsonwentoken`

## Private routes with Express using custom middleware
See middleware/authenticate.js for the code.

Folowing steps implemented:
 - custom method `generateAuthToken` created in mongodb User schema. jsonwebtoken lib is used to create JWT
 - custom static method `findByToken` created in mongodb User schema. jsonwebtoken lib is used to verify received token
 - toJSON default method om user schema is overwritten to limit properties send back to front-end.
 - authenticate middleware function created to authenticate and append user and token objects to request. So the info is passed further as props user and token of request.

## Saving encripted passwords with bcryptjs

The passwords are saved hased using [bcryptjs](https://www.npmjs.com/package/bcryptjs)

Saving hashed password is done using [mongoose middleware](http://mongoosejs.com/docs/middleware.html).
See User model UserSchema.pre('save',...)


# Testing
All test are in tests folder. Following libs are used:

- [expect](https://github.com/mjackson/expect): for assertions. This lib is donated to [JEST](https://jest-bot.github.io/jest/docs/expect.html). So use JEST documentation for using proper operators.
- [supertest](https://www.npmjs.com/package/supertest): for making requests


# Configuration setup

In the config folder we have config.js and config.json. Config.json contains environment variables and is NOT included in the repo. In order for app to work, create config.json and add props stated below. Ensure env variable of mongodb corespond to your setup.


``` json
{
  "test":{
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoAppTest",
    "JWT_SECRET": "asdqwJFNLKDMAKMD1323422ksdfsdvsz12323sz"
  },
  "development":{
    "PORT": 3000,
    "MONGODB_URI": "mongodb://localhost:27017/TodoApp",
    "JWT_SECRET": "123123123sdfsdfplkINwuebbsddcs236bf"
  }
}

``` 

# Heroku

TO deploy:

- define PORT in your server script. heroku.js in this case
- add node version in packages.json prop "engines"
- add mongoDB addon into your heroku project:

## Heroku variables

Heroku specific config variable should be used for setting up JWT_SECRET etc. When deploying on Heroku one should set JWT_SECRET variable to let this api working properly.

```bash
  # set env variable on heroku
  heroku config:set JWT_SECRET = "your value here"
  # view config variables
  heroku config
  
  # remove variable
  # heroku config:unset NAME

```

# Postman tips

Using tests tab of postman to set token variable to be used

```JavaScript
  //get token from response header  
  var token = postman.getResponseHeader('x-auth')
  postman.setEnvironmentVariable('x-auth', token)

  //get id from response body
  var body = JSON.parse(responseBody)
  postman.setEnvironmentVariable("todoId",body._id)

```


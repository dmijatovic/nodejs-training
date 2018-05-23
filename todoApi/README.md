

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

## Heroku
TO deploy:

- define PORT in your server script. heroku.js in this case
- add node version in packages.json prop "engines"
- add mongoDB addon into your heroku project:


## Mongoose email validation

See [docs](http://mongoosejs.com/docs/validation.html) and install validator lib `npm i validator --save`


## Authentication

### Hashing

SHA256 used from lib crypto-js module. See example in playground/hashing.js

### JWT
Using jwt for validation




// environments defined
let config = {
  dev: require('./webpack.dev'),
  prod: require('./webpack.prod')
};

module.exports = (env) =>{
  return config[env];
};
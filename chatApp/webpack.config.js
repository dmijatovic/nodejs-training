
const path = require('path');

module.exports = {
  mode:'development',
  entry: {
    index: './src/index.js',
    styles: './src/index.scss'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'public')
  }
};
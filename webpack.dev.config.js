var path = require('path');

var port = process.env.PORT || 8080;
var host = process.env.IP || '127.0.0.1';

module.exports = {
  devtool: 'eval',
  entry: [
    'normalize.css',
    './src/styles/app.scss',
    './src/index'
  ],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname + '/public')
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      include: path.join(__dirname, '/src'),
      query: {
        presets: [ 'es2015', 'react', "stage-2"] 
      }
    }, {
      test: /\.s?css$/,
      loaders: ['style', 'css',"sass"],
    }, {
      test: /\.json$/,
      loader: "json"
    }]
  },
  resolve: {
    root: path.resolve('./src')
  },
  devServer: {
    port: port,
    host: host
  }
};

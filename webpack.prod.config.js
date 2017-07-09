var path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map', 
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
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        // This tells the Webpack and Babel for optimization for performance
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.NoErrorsPlugin(), // Makes sure Webpack will not compile if Errors
  ]
};

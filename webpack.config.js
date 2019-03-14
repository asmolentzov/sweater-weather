const path = require('path');
const webpack = require('webpack');
const localUrl = JSON.stringify('http://localhost:3000/api/v1');
const prodUrl = JSON.stringify('https://fierce-meadow-77109.herokuapp.com/api/v1');
const apiUrl = process.env.NODE_ENV === 'production' ? prodUrl : localUrl;

module.exports = {
  entry: {
    main: "./lib/index.js",
    test: "mocha!./test/index.js"
  },
  output: {
    path: __dirname,
    filename: "[name].bundle.js"
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
    ]
  },
  resolve: {
    extensions: ['', '.js', '.json', '.css', '.scss']
  },
  plugins: [
    new webpack.DefinePlugin({
      'API_URL': apiUrl
    })
  ]
};

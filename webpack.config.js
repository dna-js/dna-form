/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-04-08 16:50:15 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 21:27:11
 */


'use strict';

const path = require('path');

function resolve(dir) {
  return path.join(__dirname, '/src/', dir);
}

module.exports = {
  mode: 'production',
  target: 'web',
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, "lib"),
    filename: '[name].js',
    publicPath: './',
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      "@config": resolve("/service/config")
    },
    modules: ['node_modules']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['eslint-loader', 'babel-loader']
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ],
    }]
  },
  externals: [
    function(context, request, callback) {
      if (/^(moment)|(antd)/i.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],
  plugins: []
};
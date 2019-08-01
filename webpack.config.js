/*
 * @Author: lianglongfei001@lianjia.com 
 * @Date: 2019-04-08 16:50:15 
 * @Last Modified by: lianglongfei001@lianjia.com
 * @Last Modified time: 2019-08-01 18:38:02
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
      "@ctx": resolve("/service/ctx")
    },
    modules: ['node_modules']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: ['babel-loader']
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
      if (/^(react)|(moment)|(antd)|(lodash)|(mobx)/i.test(request)){
        return callback(null, 'commonjs ' + request);
      }
      callback();
    }
  ],
  plugins: []
};
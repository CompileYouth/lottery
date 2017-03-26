const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  context: path.resolve('./client'),
  entry: {
    vendor: ['jquery'],
    login: ['./user/login/index.js', './user/login/res/index.less'],
    game: ['./game/index.js', './game/res/index.less']
  },
  resolve: {
    extensions: ['.js'],
  },
  output: {
    path: path.resolve('./dist/assets'),
    publicPath: '/',
    filename: './js/[name].min.js'
  },
  devServer: {
    contentBase: path.resolve('../dist/assets')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader'
        })
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader?limit=10240&name=images/[name].[hash].[ext]&outputPath=/images/'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: './css/[name].min.css'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './js/vendor.min.js',
      minChunks: Infinity
    })
  ]
};

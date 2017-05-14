require('dotenv').config()
const webpack = require('webpack');
const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const isProduction = (process.env.NODE_ENV === 'production');
const extractLess = new ExtractTextPlugin({
    filename: "[name].css",
});

module.exports = {
  context: __dirname,
  entry: {
    general: './src/js/general.js',
    memes: './src/js/memes.js',
  },
  output: {
      path: __dirname + "/dist",
      filename: '[name].js',
      publicPath: '/dist/',
  },
  devServer: {
    compress: true,
    port: 8080,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'es2015'],
          }
        }
      },
      {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[ext]'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loaders: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
            }
          },
          'img-loader'
        ],
      },
      {
        test: /\.(less|css)$/,
        use: extractLess.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'less-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          fallback: 'style-loader',
        })
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
    }),
    new webpack.DefinePlugin({
      API_KEY: JSON.stringify(process.env.API_KEY),
      API_SECRET: JSON.stringify(process.env.API_SECRET),
    }),
    extractLess,
    new PurifyCSSPlugin({
      paths: glob.sync(__dirname + '/*.html'),
      minimize: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
}

if(isProduction) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

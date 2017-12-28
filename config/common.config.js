const webpack = require('webpack');
const helpers = require('./helpers');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const publicPath = '/';

module.exports = {
  entry: {
    application: helpers.root('/source/application.ts')
  },
  output: {
    path: helpers.root('/build'),
    filename: '[name].js',
    publicPath: publicPath
  },
  resolve: {
    extensions: ['.ts', '.js', '.pug'],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'modernizr$': helpers.root('.modernizrrc')
    },
    modules: ['node_modules', helpers.root('/source')]
  },
  module: {
    rules: [{
      test: /\.pug$/,
      enforce: 'pre',
      loader: 'template-html-loader'
    },{
      test: /\.ts$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{
        loader: 'tslint-loader'
      }]
    },{
      test: /\.modernizrrc$/,
      loader: 'webpack-modernizr-loader?useConfigFile',
    },{
      test: /\.vue$/,
      loader: 'vue-loader'
    },{
      test: /\.ts$/,
      include: [
        helpers.root('/source'),
        helpers.root('/node_modules/vuex-ts-decorators')
      ],
      use: [{
        loader: 'awesome-typescript-loader'
      }]
    },{
      test: /\.(png|jpg|gif|svg)$/i,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 100,
          name: '[name].[hash:5].[ext]',
          outputPath: 'images/',
          publicPath: publicPath
        }
      }]
    },{
      test: /\.(eot|ttf|woff|woff2)$/,
      enforce: 'pre',
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[hash].[ext]',
          outputPath: 'fonts/',
          publicPath: publicPath
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'VKApi',
      language: 'ru',
      filename: helpers.root('/build/index.html'),
      template: `!!pug-loader!${helpers.root('/source/index.pug')}`,
    }),
    new ManifestPlugin(),
    // new BundleAnalyzerPlugin()
  ]
}

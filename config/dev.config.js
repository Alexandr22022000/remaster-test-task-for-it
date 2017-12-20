const DefinePlugin = require('webpack/lib/DefinePlugin');
const webpackConfig = require("./common.config");
const env = require('./env/dev.env');
const helpers = require('./helpers');

webpackConfig.devServer = {
  port: 3000,
  host: "localhost",
  historyApiFallback: true,
  watchOptions: {aggregateTimeout: 300, poll: 1000},
  contentBase: './build/',
  open: true,
  openPage: ''
};

webpackConfig.module.rules = [...webpackConfig.module.rules, {
  test: /\.sass$/,
  use: [{
    loader: 'style-loader'
  },{
    loader: 'css-loader',
    options: {
      sourceMap:true,
    }    
  },{
    loader: 'postcss-loader',
    options: {
      config: {
        path: helpers.root('/config/postcss.config.js')
      },
      sourceMap: true
    }
  },{
    loader: 'sass-loader',
    options: {
      sourceMap:true
    }    
  }]
}];

webpackConfig.plugins = [...webpackConfig.plugins,
  new DefinePlugin({
    'process.env': env
  })
];

module.exports = webpackConfig;

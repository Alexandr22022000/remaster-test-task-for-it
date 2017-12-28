const config = require('./common.config'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  CompressionPlugin = require("compression-webpack-plugin"),
  helpers = require('./helpers');

config.entry['application.min'] = helpers.root('/source/application.ts');

config.module.rules.push({
  test: /\.sass$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader!resolve-url-loader!sass-loader"
  })
});

config.plugins = [
  new UglifyJsPlugin({
    include: /\.min$/
  }),
  new ExtractTextPlugin({filename: "styles.min.css"}),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.min.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  }),
  new CompressionPlugin({test: /\.min.js$|\.min.css$/})
];

module.exports = config;

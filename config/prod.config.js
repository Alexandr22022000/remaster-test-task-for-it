const config = require('./common.config'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  CompressionPlugin = require("compression-webpack-plugin");

config.module.rules.push({
  test: /\.sass$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader!resolve-url-loader!sass-loader"
  })
});

config.plugins = [
  new UglifyJsPlugin({
    include: /\.min\.js$/,
    //minimize: true
  }),
  new ExtractTextPlugin({filename: "styles.min.css"}),
  new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.min\.css$/g,
    cssProcessor: require('cssnano'),
    cssProcessorOptions: { discardComments: {removeAll: true } },
    canPrint: true
  }),
  new CompressionPlugin({test: /\.js$|\.min.css$/})
];

module.exports = config;

var config = require('./config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var utils = require('./utils')
var baseWebpackConfig = require('./base.conf')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
var path = require('path')
module.exports = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
          sourceMap: true,
          extract: true
      })
    },
    devtool: '#source-map',
    output: {
      chunkFilename: utils.assetsPath('js/[id].js')
    },
    plugins: [
        new webpack.DefinePlugin({ 'process.env': config.dev.env }),
        new webpack.NoEmitOnErrorsPlugin(),
        new FriendlyErrorsPlugin(),
        new ExtractTextPlugin({
          // filename: utils.assetsPath('css/[name].[contenthash].css')
          filename: utils.assetsPath('css/[name].wxss')
        }),
        // Compress extracted CSS. We are using this plugin so that possible
        // duplicated CSS from different components can be deduped.
        new OptimizeCSSPlugin({
          cssProcessorOptions: {
            safe: true
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'vendor',
          minChunks: function (module, count) {
            // any required modules inside node_modules are extracted to vendor
            return (
              module.resource &&
              /\.js$/.test(module.resource) &&
              module.resource.indexOf('node_modules') >= 0
            ) || count > 1
          }
        }),
        new webpack.optimize.CommonsChunkPlugin({
          name: 'manifest',
          chunks: ['vendor']
        })
    ]
})

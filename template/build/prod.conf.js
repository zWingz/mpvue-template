/* eslint-disable */
const path = require('path')
const config = require('./config')
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./base.conf')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production';
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyEsPlugin = require('uglifyjs-webpack-plugin');

const webpackConfig = merge(baseWebpackConfig, {
    // 注入styleLoaders
    module: {
        rules: utils.styleLoaders({ sourceMap: false, extract: true })
    },
    devtool: false,
    plugins: [
        // 定义变量
        new webpack.DefinePlugin({
            'process.env': config.build.env
        }),
        new UglifyEsPlugin({
          parallel: true,
          cache: true,
        }),
        new ExtractTextPlugin({
            filename: utils.assetsPath('css/[name].wxss')
        }),
        // 使用cssnano来压缩以及优化css
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true }, safe: true }, // 删除注释
            canPrint: true
        }),
        new webpack.HashedModuleIdsPlugin(),
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
module.exports = webpackConfig

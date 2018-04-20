
const path = require('path')
const config = require('./config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


// 资源路径
exports.assetsPath = function (_path) {
  return path.posix.join(config.base.assetsSubDirectory, _path)
}

// 生成css的loader配置
exports.cssLoaders = function (options = {}) {
    /**
     * 官方的
     */
    options = options || {}

    const cssLoader = {
            loader: 'css-loader',
            options: {
                minimize: true,
                sourceMap: options.sourceMap
            }
        },
        postcssLoader = {
            loader: 'postcss-loader',
            options: {
                sourceMap: options.sourceMap
            }
        },
        px2rpxLoader = {
          loader: 'px2rpx-loader',
          options: {
            baseDpr: 2,
            rpxUnit: 1
          }
        },
        sassResourceLoader = {
            loader: 'sass-resources-loader',
            options: {
                resources: [path.resolve(__dirname, '../src/sass/variable.scss')]
            }
        };
    function generateLoaders(loader, loaderOptions) {
        var loaders = [cssLoader, px2rpxLoader, postcssLoader]
        if(loader) {
            loaders.push({
                loader: loader + '-loader',
                options: Object.assign({}, loaderOptions, { sourceMap: options.sourceMap })
            })
        }
        if(options.extract) {
            return ExtractTextPlugin.extract({
                use: loaders,
                fallback: 'vue-style-loader'
            })
        }
        return ['vue-style-loader'].concat(loaders)
    }
    const sassLoader = generateLoaders('sass', { includePaths: [path.resolve(__dirname, '../src/sass')] }).concat([sassResourceLoader])
    return {
        css: generateLoaders(),
        sass: sassLoader,
        scss: sassLoader
    }
}

// 用于生产webpack的rules
exports.styleLoaders = function (options) {
    var output = []
    var loaders = exports.cssLoaders(options)
    for(var extension in loaders) {
        var loader = loaders[extension]
        output.push({
            test: new RegExp('\\.' + extension + '$'),
            use: loader
        })
    }
    return output
}

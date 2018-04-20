var path = require('path')
var config = require('./config')
var utils = require('./utils')
var MpvuePlugin = require('webpack-mpvue-asset-plugin')
var projectRoot = path.resolve(__dirname, '../')
var isProduction = process.env.NODE_ENV !== 'development';
var glob = require('glob')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
function getEntry (rootSrc, pattern) {
  var files = glob.sync(path.resolve(rootSrc, pattern))
  return files.reduce((res, file) => {
    var info = path.parse(file)
    var key = info.dir.slice(rootSrc.length + 1) + '/' + info.name
    res[key] = path.resolve(file)
    return res
  }, {})
}

const appEntry = { app: resolve('./src/main.js') }
const pagesEntry = getEntry(resolve('./src'), 'pages/**/main.js')
const entry = Object.assign({}, appEntry, pagesEntry)

module.exports = {
    entry,
    target: require('mpvue-webpack-target'),
    output: {
        path: config.base.assetsRoot,
        publicPath: config.assetsPublicPath,
        filename: utils.assetsPath('js/[name].js'),
        chunkFilename: utils.assetsPath('js/[id].js')
    },
    // require 解析
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      symlinks: false,
      modules: [
          path.join(__dirname, '../src'),
          'node_modules'
      ],
      alias: {
        'vue': 'mpvue',
        '@': path.resolve(__dirname, '../src'),
        static: '@/static',
        components: '@/components',
        js: '@/js',
        sass: '@/sass',
        store: '@/store',
        router: '@/router',
        pages: '@/pages',
        http: '@/http'
      }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'mpvue-loader',
                        options: {
                            loaders: utils.cssLoaders({
                                sourceMap: !isProduction,
                                extract: true
                            }),
                            preserveWhitespace: false,
                            transformToRequire: {
                                video: 'src',
                                source: 'src',
                                img: 'src',
                                image: 'xlink:href'
                            }
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: true
                    }
                }, {
                  loader: 'mpvue-loader',
                  options: {
                    checkMPEntry: true
                  }
                }],
                include: projectRoot,
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: utils.assetsPath('img/[name].[hash:7].[ext]')
                    }
                }]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                    }
                }]
            }
        ]
    },
    plugins: [
      new MpvuePlugin()
    ],
    node: {
        setImmediate: false,
        dgram: 'empty',
        fs: 'empty',
        net: 'empty',
        tls: 'empty',
        child_process: 'empty',
        Buffer: false
    }
}


var config = require('./config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

// var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var portfinder = require('portfinder')
var webpackConfig = require('./dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port

var app = express()
var compiler = webpack(webpackConfig)

// serve pure static assets
var staticPath = path.posix.join(config.base.assetsPublicPath, config.base.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

// var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = port
  portfinder.getPortPromise()
  .then(newPort => {
      if (port !== newPort) {
        console.log(`${port}端口被占用，开启新端口${newPort}`)
      }
      var server = app.listen(newPort, 'localhost')
      // for 小程序的文件保存机制
      require('webpack-dev-middleware-hard-disk')(compiler, {
        publicPath: webpackConfig.output.publicPath,
        quiet: true
      })
      resolve({
        ready: readyPromise,
        close: () => {
          server.close()
        }
      })
  }).catch(error => {
    console.log('没有找到空闲端口，请打开任务管理器杀死进程端口再试', error)
  })
})

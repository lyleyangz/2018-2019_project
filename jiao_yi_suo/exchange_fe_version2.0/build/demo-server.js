require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.demo.conf')
var jsonServer = require('json-server')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.demo.port
// default port where json server listens for mock data
var jsonServerPort = config.demo.jsonServerPort || 1234
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.demo.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.demo.proxyTable

// json-server start
var server = jsonServer.create()
var router = jsonServer.router(path.join(__dirname, '..', 'mock/mock.json'))
var middleware = jsonServer.defaults()

router.render = (req, res) => {
  res.json({
    code: 200,
    data: res.locals.data,
    message: 'json-server mock data'
  })
}

server.use(middleware)
server.use(jsonServer.rewriter(config.demo.rewrite || {}))
server.use(router)
server.listen(jsonServerPort, () => {
  console.log(`JSON Server is running at port: ${jsonServerPort}`)
})

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port
if (config.demo.autoOpenUrl) {
  uri += config.demo.autoOpenUrl
}
var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser) {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}

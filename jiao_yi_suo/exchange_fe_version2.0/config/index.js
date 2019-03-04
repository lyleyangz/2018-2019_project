// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    // index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: '/',
    // productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 9099,
    autoOpenBrowser: true,
    autoOpenUrl: '/',
    assetsRoot: path.join(__dirname, '..', 'static'), // (dev) 静态文件输出目录
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/': {
        target: 'http://exchang.test1.xsl.ph', // 开发调试接口地址
        changeOrigin: true,
        withCredentials: true
        // onProxyRes: function(proxyRes, req, res) {
        //   proxyRes.headers['Content-Type'] = 'application/json; charset=utf-8'
        // }
      }
    },
    cssSourceMap: false
  },
  demo: {
    env: require('./demo.env'),
    assetsRoot: path.join(__dirname, '..', 'static'), // (demo) 静态文件输出目录
    port: 9090,
    jsonServerPort: 1234,
    autoOpenBrowser: true,
    autoOpenUrl: '/',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api/': {
        target: 'http://localhost:1234', // json-server模拟数据接口地址
        changeOrigin: true,
        // onProxyRes: function(proxyRes, req, res) {
        //   proxyRes.headers['Content-Type'] = 'application/json; charset=utf-8'
        // }
      }
    },
    // rewrite: {
    //   '/api/': '/'
    // },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}

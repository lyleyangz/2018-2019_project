var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var getEntryList = require('./getEntryList')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  entry: getEntryList('./src/views'),
  output: {
    path: config.build.assetsRoot, // webpack输出的目标文件夹路径（例如：/dist）
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' // webpack编译输出的发布路径前缀
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  // 用cdn加载更慢了......
  // externals: {
  //   vue: 'Vue'
  // },
  resolve: {
    extensions: ['.js', '.vue', '.json'], // 自动resolve的扩展名
    alias: { // 文件夹路径别名
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
      '@common': resolve('src/common'),
      '@components': resolve('src/common/components'),
      '@utils': resolve('src/common/utils'),
      '@api': resolve('src/api')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          formatter: require('eslint-friendly-formatter')
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src')]
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}

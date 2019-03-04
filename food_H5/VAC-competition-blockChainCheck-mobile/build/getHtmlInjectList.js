const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const getEntryList = require('./getEntryList')
const config = require('../config')

const options = {
  ext: 'html',
  vendor: ['manifest','vendor']
}

let envConfig = null

switch (process.env.NODE_ENV) {
  case 'production':
    envConfig = config.build
    break
  case 'development':
    envConfig = config.dev
    break
  default:
    envConfig = config.dev
}

let entryList = getEntryList('./src/views')

let htmlInjectList = Object.keys(entryList).map(entryName => {
  // 生产环境对模板进行压缩处理
  let extraOptions = process.env.NODE_ENV === 'production' ? {
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      // more options:
      // https://github.com/kangax/html-minifier#options-quick-reference
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    },
    chunks: [entryName].concat(options.vendor)
  } : {}
  return new HtmlWebpackPlugin(Object.assign({
    // filename: path.join(envConfig.assetsRoot, `${entryName}.${options.ext}`),
    filename: process.env.NODE_ENV === 'development' ? `${entryName}.${options.ext}` : `${envConfig.assetsRoot}/${entryName}.${options.ext}`,
    template: `src/views/${entryName}/${entryName}.html`,
    chunks: [entryName],
    inject: true,
    favicon: './favicon.ico'
  }, extraOptions))
})

module.exports = htmlInjectList

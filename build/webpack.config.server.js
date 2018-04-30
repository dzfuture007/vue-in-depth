const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const ExtractPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

const config = merge(baseConfig, {
  // 打包出来的程序是在node端运行的
  target: 'node',
  entry: path.join(__dirname, '../client/server.entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  // 不要去打包这部分文件。
  // dependencies：是在应用运行起来的时候真正需要的代码。
  // devDependencies：一些工具性的库，在应用真正运行起来之后是不需要的，它之后在我们执行一些打包或者是工具化的操作的时候才需要。
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [{
      test: /\.styl/,
      use: ExtractPlugin.extract({
        fallback: 'vue-style-loader',
        use: [
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          'stylus-loader'
        ]
      })
    }]
  },
  plugins: [
    new ExtractPlugin('styles.[contentHash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config

const path = require('path')
const fs = require('fs')
const Router = require('koa-router')
const axios = require('axios')
const MemoryFS = require('memory-fs')
const webpack = require('webpack')
const VueServerRenderer = require('vue-server-renderer')

const serverRender = require('./server-render')
const serverConfig = require('../../build/webpack.config.server')

const serverCompiler = webpack(serverConfig)
// memory-fs
// 它的API和node中fs的API是一模一样的，它还扩展了一些API。
// 它跟fs的区别：
// 它不把文件写入到磁盘上面，它直接写在内存中，写入到磁盘中是非常耗时的操作，所以文件的读取和输出都使用memory-fs。
const mfs = new MemoryFS()
serverCompiler.outputFileSystem = mfs

let bundle

// 每次有文件变化，webpack重新打包
serverCompiler.watch({}, (err, states) => {
  if (err) throw err
  states = states.toJson()
  states.errors.forEach(err => console.log(err))
  states.warnings.forEach(warn => console.log(warn))

  const bundlePath = path.join(serverConfig.output.path, 'vue-ssr-server-bundle.json')
  bundle = JSON.parse(mfs.readFileSync(bundlePath, 'utf-8'))
  console.log('new bundle generated')
})

const handleSSR = async (ctx) => {
  if (!bundle) {
    ctx.body = '你等一会儿，别着急.....'
    return
  }

  const clientManifestResp = await axios.get(
    'http://127.0.0.1:8000/public/vue-ssr-client-manifest.json'
  )

  const clientManifest = clientManifestResp.data

  const template = fs.readFileSync(
    path.join(__dirname, '../server.template.ejs'),
    'utf-8'
  )

  const renderer = VueServerRenderer
    .createBundleRenderer(bundle, {
      inject: false,
      clientManifest
    })

  await serverRender(ctx, renderer, template)
}

const router = new Router()
router.get('*', handleSSR)

module.exports = router

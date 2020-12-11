const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const NodeEnv = {
  Production: process.env.NODE_ENV === 'production',
  Development: process.env.NODE_ENV === 'development'
}

// 线上打包路径，请根据项目实际线上情况
const BASE_URL = NodeEnv.Production ? '/' : '/'

module.exports = {
  publicPath: BASE_URL,
  outputDir: 'dist', // 打包生成的生产环境构建文件的目录
  assetsDir: '', // 放置生成的静态资源路径，默认在outputDir
  indexPath: 'index.html', // 指定生成的 index.html 输入路径，默认outputDir
  pages: undefined, // 构建多页
  runtimeCompiler: true,
  productionSourceMap: false, // 开启 生产环境的 source map
  chainWebpack: config => {
    // 配置路径别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('_view', resolve('src/views'))
      .set('img', resolve('src/assets/image'))
  },
  css: {
    requireModuleExtension: true, // 启用 CSS modules
    // extract: NodeEnv.Production ? true : false, // 是否使用css分离插件
    sourceMap: false, // 开启 CSS source maps?
    loaderOptions: {
      sass: {
        prependData: '@import "@/assets/css/base.scss";'
      }
    }
  },
  devServer: {
    host: '0.0.0.0',
    port: 8888, // 端口
    proxy: {
      '^/api': {
        target: '网址',
        changeOrigin: true
      },
    }
  }
}

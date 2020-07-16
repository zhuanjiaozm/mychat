const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const path = require('path');
const defaultSettings = require('./src/config/index.js');
// 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir);// path.join(__dirname)设置绝对路径
}
module.exports = {
  //输出文件夹，我这里设为www,主要是和Cordova配合生成安卓应用的。
  outputDir: 'www',

  //不生成map
  productionSourceMap: false,

  // 包含运行时编译器的 Vue 构建版本
  runtimeCompiler: true,

  chainWebpack: (config) => {
    // 添加别名
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('api', resolve('src/api'))
      .set('views', resolve('src/views'))
      .set('components', resolve('src/components'));
  },

  devServer: {
    port: 8888, // 端口
    proxy: {
      // proxy all requests starting with /api to jsonplaceholder
      '/api': {
        target: 'http://localhost:8802', // 代理接口
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/auth/', // 代理的路径
        },
      },
    },
  },

  css: {
    extract: false,
    loaderOptions: {
      scss: {
        prependData: '\n          @import "assets/css/var.scss";\n          '
      }
    }
  },

  publicPath: './',
  assetsDir: 'static'
};

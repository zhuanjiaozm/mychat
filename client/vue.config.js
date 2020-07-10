const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const path = require('path');
const defaultSettings = require('./src/config/index.js');
// 引入path模块
function resolve(dir) {
  return path.join(__dirname, dir);// path.join(__dirname)设置绝对路径
}
module.exports = {
  lintOnSave: true,
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
    extract: IS_PROD,
    sourceMap: false,
    loaderOptions: {
      scss: {
        // 注入 `sass` 的 `mixin` `variables` 到全局, $cdn可以配置图片cdn
        // 详情: https://cli.vuejs.org/guide/css.html#passing-options-to-pre-processor-loaders
        prependData: `
          @import "assets/css/var.scss";
          `,
      },
    },
  },
};

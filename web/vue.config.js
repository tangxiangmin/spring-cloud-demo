
module.exports = {
  css: {

    loaderOptions: {
      sass: {
        /* 引入全局scss 字体变量 */
        prependData: `
          @import "~@/assets/rem.scss";
        `
      },
      css: {}
    }
  },
  devServer: {
    port: 9734,
    proxy: {
      '/': {
        crossOrigin: true,
        target: 'http://127.0.0.1:8080/'
      }
    }
  }
}

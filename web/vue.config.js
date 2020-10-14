
module.exports = {
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

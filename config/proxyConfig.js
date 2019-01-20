/**
 * 解决跨域问题
 * @type {{proxyList: {'/': {changeOrigin: boolean, pathRewrite: {'^/': string}, target: string}}}}
 */

module.exports = {
  proxyList: {
    '/apis': {         //将http://localhost:9000印射为/apis
      target: 'http://localhost:9000',  // 接口域名
      changeOrigin: true,  //是否跨域
      pathRewrite: {
        '^/apis': ''      //需要rewrite的,
      }
    }
  }
}

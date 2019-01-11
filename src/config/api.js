import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios
axios.defaults.baseURL = '/apis'
axios.defaults.withCredentials = true

export default {
  problemDetail (problemId) {
    return ajax('problem/detail', 'get', {
      params: {
        problemId: problemId
      }
    })
  },
  submissionMy (data) {
    return ajax('submission/my', 'post', {
      data
    })
  },
  submitCode (data) {
    return ajax('submission/submit', 'post', {
      data
    })
  },
  submissionDetail (submissionId) {
    return ajax('submission/detail', 'get', {
      params: {
        submissionId: submissionId
      }
    })
  },
  getLastCode (problemId) {
    return ajax('submission/getLastCode', 'get', {
      params: {
        problemId: problemId
      }
    })
  }
}

/**
 * @param url
 * @param method get|post|put|delete...
 * @param params like queryString. if a url is index?a=1&b=2, params = {a: '1', b: '2'}
 * @param data post data, use for method put|post
 * @returns {Promise}
 */
function ajax (url, method, options) {
  if (options !== undefined) {
    var {params = {}, data = {}} = options
  } else {
    params = data = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url,
      method,
      params,
      data
    }).then(res => {
      // API正常返回(status=20x), 是否错误通过有无error判断
      if (res.data.code !== 0) {
        Vue.prototype.$error(res.data.data)
        reject(res)
        // 若后端返回为登录，则为session失效，应退出当前登录用户
        if (res.data.data.startsWith('Please login')) {
        }
      } else {
        resolve(res)
        // if (method !== 'get') {
        //   Vue.prototype.$success('Succeeded')
        // }
      }
    }, res => {
      // API请求异常，一般为Server error 或 network error
      reject(res)
      Vue.prototype.$error(res.data.data)
    })
  })
}

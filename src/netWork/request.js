import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'

axios.defaults.baseURL = 'http://localhost:3000'

let loadingInstance = null
// 配置axios请求拦截器
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service()
  return config
})
// 配置axios响应拦截器
axios.interceptors.response.use(config => {
  loadingInstance.close()
  return config.data
})

export default axios

Vue.prototype.$http = axios

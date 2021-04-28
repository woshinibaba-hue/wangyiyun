import Vue from 'vue'
import axios from 'axios'
import { Loading } from 'element-ui'

// 配置axios默认路径
axios.defaults.baseURL = 'http://musicapi.leanapp.cn/'
// 允许跨域请求携带cookie
axios.defaults.withCredentials = true

let loadingInstance = null
// 配置axios请求拦截器
axios.interceptors.request.use(config => {
  loadingInstance = Loading.service() // 开启loading提示
  return config
})
// 配置axios响应拦截器
axios.interceptors.response.use(config => {
  loadingInstance.close() // 关闭loading提示
  return config.data
})

// 默认导出axios
export default axios

// 将axios添加到vue原型对象当中
Vue.prototype.$http = axios

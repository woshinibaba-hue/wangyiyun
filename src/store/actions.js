import axios from '../netWork/request'
export default {
  // context 是actions 默认传递的参数 代表上下文
  // payload 就是调用actions 传递过来的参数
  // 音乐url地址
  async getMusic(context, payload) {
    try {
      const { data } = await axios.get('/song/url', { params: { id: payload } })
      context.commit('SetMusic', [data, payload])
      context.commit('SetPlayMusic', payload)
    } catch (error) {
      console.log(error, '出错啦')
    }
  }
}

import axios from '../netWork/request'
import Vue from 'vue'
export default {
  // context 是actions 默认传递的参数 代表上下文
  // payload 就是调用actions 传递过来的参数
  // 音乐url地址
  async getMusic(context, payload) {
    try {
      const { data } = await axios.get('/song/url', { params: { id: payload } })
      if (!data[0].url) {
        alert('播放源已失效')
        return
      }
      context.commit('SetMusic', [data, payload])
      context.dispatch('getMusicDetail', payload)
    } catch (error) {
      console.log(error, '出错啦')
    }
  },
  // 查询当前歌曲的详情信息
  async getMusicDetail(context, payload) {
    try {
      const { songs } = await axios.get('/song/detail', { params: { ids: payload } })
      context.commit('SetPlayMusic', songs[0])
    } catch (error) {
      console.log(error, '出错啦')
    }
  }
}

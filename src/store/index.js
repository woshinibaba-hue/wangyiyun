import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    music: {}, // 当前需要播放音乐的数据
    musicList: [], // 音乐榜单详情
    musicId: 0, // 当前播放音乐id
    playMuisc: {}
  },
  // mutations  用于对state里面的状态进行修改
  mutations,
  // actions 用于完成异步操作，异步操作完成之后，如需对state状态进行修改，则需要commit提交给 mutations来完成
  actions,
  modules: {}
})

export default {
  // 当前播放的音乐url地址
  SetMusic(state, payload) {
    state.music = payload[0][0]
    state.musicId = payload[1]
  },
  // 当前音乐榜单信息
  SetMusicList(state, payload) {
    state.musicList = payload
  },
  // 当前播放音乐的信息
  SetPlayMusic(state, payload) {
    state.playMuisc = payload
  },
  // 当前用户登录信息
  SetUserInfo(state, payload) {
    state.UserInfo = payload
    state.UserInfo.isLogin = true
  },
  // 设置动态ID
  SetThreadId(state, payload) {
    state.threadId = payload
  }
}

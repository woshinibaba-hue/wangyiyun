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
    state.musicList.forEach(item => {
      if (item.id == payload) {
        state.playMuisc = item
      }
    })
  }
}

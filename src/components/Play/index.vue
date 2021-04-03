<template>
  <div class="playMusic">
    <div class="left">
      <div class="play-img">
        <img :src="playMuisc.al.picUrl" alt="" />
      </div>
      <div>
        <p class="album">{{ playMuisc.name }}</p>
        <p class="singer">{{ playMuisc.ar[0].name }}</p>
      </div>
    </div>
    <div class="center">
      <i class="iconfont icon-shangyishou previous" @click="previous"></i>
      <i class="iconfont icon-zanting stop" v-if="flag" @click="pause()"></i>
      <i class="iconfont icon-zanting1 play1" v-else @click="play()"></i>
      <i class="iconfont icon-xiayishou next" @click="nextMusic"></i>
      <audio class="player" :src="music.url" autoplay @ended="ended" @timeupdate="timeupdate" @play="playMusic"></audio>
    </div>
    <div class="progress-warp">
      <span class="start-time">{{ MusicTime }}</span>
      <div class="progress" @click="click">
        <el-progress :percentage="percentage" :color="customColor" :show-text="false" class="progress-btn"></el-progress>
      </div>
      <span class="end-time">{{ playMuisc.dt | formatTime }}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      flag: true,
      percentage: 0, // 进度条百分比
      customColor: '#c10d0c', // 进度表前景色
      MusicTime: '00:00'
    }
  },
  computed: {
    ...mapState(['music', 'musicId', 'musicList', 'playMuisc'])
  },
  methods: {
    // 音乐播放完毕之后执行,自动切换下一首
    ended() {
      this.toggleMusic(1)
    },
    // 获取播放进度
    timeupdate(e) {
      let m = parseInt(e.target.currentTime) / 60
      let s = parseInt(e.target.currentTime) % 60
      this.MusicTime =
        parseInt(m)
          .toString()
          .padStart(2, '0') +
        ':' +
        parseInt(s)
          .toString()
          .padStart(2, '0')
      let ss = this.playMuisc.dt / 1000
      this.percentage = (e.target.currentTime / ss) * 100
    },
    // 点击播放暂停按钮
    pause() {
      let audio = document.querySelector('audio')
      audio.play()
      this.flag = false
    },
    play() {
      let audio = document.querySelector('audio')
      audio.pause()
      this.flag = true
    },
    // 监听音乐播放事件
    playMusic() {
      this.flag = false
    },
    // 点击切换下一首
    nextMusic() {
      this.toggleMusic(1)
    },
    // 点击切换上一首
    previous() {
      this.toggleMusic(0)
    },
    // 切换音乐
    toggleMusic(type) {
      this.musicList.forEach((item, index) => {
        if (item.id == this.musicId) {
          // 下一首
          if (type == 1) {
            if (index + 1 >= this.musicList.length) {
              this.$store.dispatch('getMusic', this.musicList[0].id)
            } else {
              this.$store.dispatch('getMusic', this.musicList[index + 1].id)
            }
            this.percentage = 0
          } else {
            // 上一首
            if (index - 1 < 0) {
              this.$store.dispatch('getMusic', this.musicList[this.musicList.length - 1].id)
            } else {
              this.$store.dispatch('getMusic', this.musicList[index - 1].id)
            }
            this.percentage = 0
          }
        }
      })
    },
    click(e) {
      let progress = document.querySelector('.progress')
      let playMusic = document.querySelector('.playMusic')
      let player = document.querySelector('.player')
      console.log(playMusic.offsetLeft)
      this.percentage = ((e.pageX - playMusic.offsetLeft) / 500) * 100
      player.currentTime = (this.playMuisc.dt * ((e.pageX - progress.offsetLeft) / 500)) / 1000
    }
  }
}
</script>

<style scoped>
.playMusic {
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  /* width: 100%; */
  width: 1100px;
  height: 100px;
  text-align: center;
  background-color: salmon;
  border-radius: 8px;
  z-index: 999999;
}
.player {
  width: 600px;
}
.left {
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #eee;
  margin-left: 30px;
  line-height: 30px;
}
.play-img {
  height: 100%;
}
.play-img img {
  width: 80px;
}
.album,
.singer {
  width: 80px;
  padding: 0 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.center {
  display: flex;
  align-items: center;
  margin: 0 30px;
}
.iconfont {
  color: #fff;
  font-size: 20px;
  cursor: pointer;
}
.stop,
.play1 {
  margin: 0 10px;
  font-size: 30px;
}
.play1 {
  font-weight: 700;
}
.progress-warp {
  width: 600px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  color: #606266;
}
.progress {
  padding: 0;
  margin: 0;
  cursor: pointer;
}
.el-progress {
  width: 500px;
}
</style>

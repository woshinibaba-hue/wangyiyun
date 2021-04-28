<template>
  <!-- 播放 -->
  <div class="wrap">
    <el-collapse-transition>
      <div class="playMusic" v-show="isShow">
        <div class="left">
          <div class="play-img">
            <img :src="playMuisc.al && playMuisc.al.picUrl" alt="" />
          </div>
          <div>
            <p class="album">{{ playMuisc && playMuisc.name }}</p>
            <p class="singer">{{ playMuisc && playMuisc.ar[0].name }}</p>
          </div>
        </div>
        <div class="center">
          <i class="iconfont icon-shangyishou previous" @click="previous"></i>
          <i class="iconfont icon-zanting stop" v-if="flag" @click="play()"></i>
          <i class="iconfont icon-zanting1 play1" v-else @click="play()"></i>
          <i class="iconfont icon-xiayishou next" @click="nextMusic"></i>
          <audio class="player" :src="music.url" autoplay @ended="ended" @timeupdate="timeupdate" @play="playMusic"></audio>
        </div>
        <div class="progress-warp">
          <span class="start-time">{{ MusicTime }}</span>
          <div class="progress" @click="playBack">
            <el-progress v-if="percentage" :percentage="percentage" :color="customColor" :show-text="false" class="progress-btn"></el-progress>
          </div>
          <span class="end-time">{{ playMuisc.dt | formatTime }}</span>
          <div>
            <i class="iconfont icon-suijibofang model" v-if="model == 2" @click="toggleModel"></i>
            <i class="iconfont icon-icon- model" v-else-if="model == 1" @click="toggleModel"></i>
            <i class="iconfont icon-hanhan-01-01 model" v-else @click="toggleModel"></i>
          </div>
        </div>
        <div class="Lrc">
          <ul class="lrc-item" :style="{ 'margin-top': marginTop }" v-if="lrc.length">
            <!-- class="current" 歌词高亮 -->
            <li :class="{ current: i == index - 1 }" v-for="(item, i) in lrc" :key="i">{{ item }}</li>
          </ul>
          <h3 v-else>暂无歌词</h3>
        </div>
      </div>
    </el-collapse-transition>
    <div class="show" @click="isShow = !isShow">点我收齐 / 展开</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      flag: true,
      percentage: 0, // 进度条百分比
      customColor: '#c10d0c', // 进度条前景色
      MusicTime: '00:00', // 当前播放音乐时长
      model: 1,
      random: 0,
      isShow: true,
      lrc: [], // 歌词
      lcrTime: [],
      index: 0,
      marginTop: '0px' // 歌词滚动距离
    }
  },
  mounted() {},
  computed: {
    ...mapState(['music', 'musicId', 'musicList', 'playMuisc'])
  },
  methods: {
    // 音乐播放完毕之后执行,自动切换下一首
    ended() {
      if (this.model == 0) {
        let player = document.querySelector('.player')
        player.currentTime = 0
        this.index = 0
        this.percentage = 0
        player.play()
      } else {
        this.toggleMusic(1)
        this.marginTop = '0px'
        this.percentage = 0
        this.index = 0
      }
    },
    // 获取播放进度
    timeupdate(e) {
      let m = parseInt(e.target.currentTime) / 60
      let s = parseInt(e.target.currentTime) % 60
      // let lrcItem = document.querySelector('.lrc-item')
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
      if (parseFloat(this.lcrTime[this.index]) <= parseFloat(e.target.currentTime.toFixed(2))) {
        this.index = this.index + 1
        this.marginTop = -(this.index - 3) * 16 + 'px'
        // lrcItem.style.marginTop = -(this.index - 3) * 16 + 'px'
      }
    },
    // 点击播放暂停按钮
    play() {
      let player = document.querySelector('.player')
      this.flag = !this.flag
      !this.flag ? player.play() : player.pause()
    },
    // 监听音乐播放事件
    async playMusic() {
      this.flag = false
      this.getLrc(this.musicId)
      this.index = 0
    },
    // 点击切换下一首
    nextMusic() {
      this.toggleMusic(1)
      this.index = 0
    },
    // 点击切换上一首
    previous() {
      this.toggleMusic(0)
      this.index = 0
    },
    // 切换音乐
    toggleMusic(type) {
      this.musicList.forEach((item, index) => {
        if (item.id == this.musicId) {
          // 列表循环播放
          if (this.model !== 2) {
            if (type == 1) {
              // 下一首
              if (index + 1 >= this.musicList.length) {
                this.$store.dispatch('getMusic', this.musicList[0].id)
                this.getLrc(this.musicList[0].id)
              } else {
                this.$store.dispatch('getMusic', this.musicList[index + 1].id)
                this.getLrc(this.musicList[index + 1].id)
              }
              this.marginTop = '0px'
              this.index = 0
            } else if (type == 0) {
              // 上一首
              if (index - 1 < 0) {
                this.$store.dispatch('getMusic', this.musicList[this.musicList.length - 1].id)
                this.getLrc(this.musicList[this.musicList.length - 1].id)
              } else {
                this.$store.dispatch('getMusic', this.musicList[index - 1].id)
                this.getLrc(this.musicList[index - 1].id)
              }
              this.marginTop = '0px'
              this.index = 0
            }
          } else {
            // 随机播放
            let random1 = Math.round(Math.random() * this.musicList.length - 1)
            if (this.random == random1) {
              this.random = 0
            } else {
              this.random = Math.abs(random1)
            }
            this.$store.dispatch('getMusic', this.musicList[this.random].id)
            this.getLrc(this.musicList[this.random].id)
            this.marginTop = '0px'
            this.index = 0
          }
        }
      })
    },
    // 点击进度条切换歌曲播放位置
    playBack(e) {
      let player = document.querySelector('.player')
      let progress = document.querySelector('.progress')
      this.percentage = ((e.pageX - progress.offsetLeft) / 500) * 100
      player.currentTime = (this.playMuisc.dt * ((e.pageX - progress.offsetLeft) / 500)) / 1000
      this.lcrTime.forEach((item, index) => {
        if (player.currentTime >= item) {
          return (this.index = index)
        }
      })
      player.play()
    },
    // 切换播放模式
    toggleModel() {
      if (this.model + 1 > 2) {
        this.model = 0
      } else {
        this.model = this.model + 1
      }
    },
    // 获取歌词
    async getLrc(id) {
      this.lrc = [] // 清空之前歌词
      const { lrc } = await this.$http.get('/lyric', { params: { id } })
      if (lrc) {
        let lrcArr = lrc.lyric.split('\n') // 将字符串歌词分割为数组
        let time = [] // 格式化之前时间
        let t = [] // 格式化之后的时间
        let timerRag = /\[(\d*:\d*\.\d*)]/ // 正则表达式 用于匹配 [] 里面的时间
        lrcArr.forEach(item => {
          t.push(item.split(timerRag)[1] && item.split(timerRag)[1].split(':')) // 将分钟与秒进行分割，分割为一个新数组
          this.lrc.push(item.split(timerRag)[2]) // 将歌词保存
        })
        t.pop() // 删除最后一个元素
        t.forEach(item => {
          let m = parseInt(item[0]) * 60
          let s = parseFloat(item[1])
          time.push((m + s).toFixed(2))
        })
        this.lcrTime = time // 将转换之后的时间保存到data当中
      }
    }
  }
}
</script>

<style scoped>
.playMusic {
  transition: all 0.6s;
}
.wrap {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 100px;
  z-index: 999999;
}
.playMusic {
  display: flex;
  align-items: center;
  text-align: center;
  background-color: tomato;
  border-radius: 8px;
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
  margin: 0 10px;
  cursor: pointer;
}
.el-progress {
  width: 500px;
}
.model {
  margin-left: 20px;
  font-weight: 700;
  font-size: 30px;
}
.show {
  position: absolute;
  top: -30px;
  right: 20px;
  width: 100px;
  line-height: 20px;
  padding: 5px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.1);
  color: #fff;
  border-radius: 5px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  cursor: pointer;
}
.Lrc {
  background-color: #fff;
  width: 500px;
  height: 70px;
  font-size: 12px;
  overflow: hidden;
  margin-left: 60px;
}
.lrc-item {
  transition: all 0.5s;
}
.lrc-item li {
  padding: 0 10px;
  width: 500px;
  height: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  transition: all 0.5s;
}
.current {
  color: skyblue;
}
</style>

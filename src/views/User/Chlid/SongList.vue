<template>
  <div class="user-songs">
    <div class="header-song">
      <h2 class="listen">听歌排行<span class="sum">累计听歌9999首</span></h2>
      <ul>
        <li :class="{ current: type == 1 }" @click="getSong(1)">最近一周</li>
        /
        <li :class="{ current: type == 0 }" @click="getSong(0)">所有时间</li>
      </ul>
    </div>
    <!-- 听歌排行 -->
    <div class="songs-warp">
      <ul>
        <!-- class gehang  隔行换色 -->
        <li @click="playMusic(item.song.id)" :class="{ gehang: (index + 1) % 2 == 0, currentPlay: musicId == item.song.id }" v-for="(item, index) in songList" :key="item.song.id">
          <div class="song-detail">
            <span class="ranking">{{ index + 1 }}.</span>
            <div class="iconfont icon-bofang song">
              <span class="song-name">{{ item.song.name }} - </span>
              <span class="singer">{{ item.song.ar[0].name }}</span>
            </div>
          </div>
          <span class="count">{{ item.playCount }} 次 </span>
        </li>
      </ul>
    </div>
    <div class="back" @click="back">
      返回上一页
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      type: 1,
      songList: []
    }
  },
  created() {
    this.getSongList()
  },
  computed: {
    ...mapState(['UserInfo', 'musicId'])
  },
  methods: {
    // 点击最近一周或者所有时间
    getSong(type) {
      this.type = type
      this.getSongList()
    },
    // 获取用户播放记录
    async getSongList() {
      let res = await this.$http.get('/user/record', { params: { uid: this.UserInfo.profile.userId, type: this.type } })
      this.type == 1 ? (this.songList = res.weekData) : (this.songList = res.allData)
      console.log(res)
    },
    back() {
      this.$router.push('/user')
      this.$emit('flag1', true)
    },
    playMusic(id) {
      this.$store.dispatch('getMusic', id)
      const songs = []
      this.songList.forEach(item => {
        songs.push(item.song)
      })
      this.$store.commit('SetMusicList', songs)
    }
  }
}
</script>

<style scoped>
.header-song {
  display: flex;
  justify-content: space-between;
}
.header-song > ul {
  display: flex;
  font-size: 12px;
}
.header-song > ul > li {
  margin: 0 10px;
  color: #999;
  cursor: pointer;
}
.current {
  color: #000 !important;
  font-weight: 700;
}
.listen {
  font-size: 18px;
  color: #777;
}
.sum {
  color: #555;
  font-size: 12px;
  font-weight: 400;
  margin-left: 15px;
}
.songs-warp {
  margin: 20px 0;
  border: 1px solid #ccc;
  border-top: 2px solid #c20c0c;
  overflow: hidden;
}
.songs-warp ul li {
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px 20px;
  cursor: pointer;
}
.songs-warp ul li:hover {
  background-color: #eee;
}
.songs-warp ul li .song {
  display: inline-block;
  margin-left: 15px;
}
.song-name {
  margin-left: 10px;
  font-size: 14px;
  font-weight: 700;
}
.singer {
  font-size: 12px;
  color: #ccc;
}
.songs-warp ul li .count {
  margin-right: 60px;
}
.back {
  position: fixed;
  top: 50%;
  left: 70px;
  width: 60px;
  line-height: 30px;
  color: #fff;
  font-size: 12px;
  background-color: skyblue;
  cursor: pointer;
}
.back::before {
  position: absolute;
  left: -30px;
  content: '';
  color: #000;
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-right-color: skyblue;
}
</style>

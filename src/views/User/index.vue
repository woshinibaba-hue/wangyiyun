<template>
  <div>
    <div class="warp">
      <div v-if="flag">
        <div class="header-warp">
          <div class="portrait">
            <img :src="UserInfo.profile.avatarUrl" alt="" />
          </div>
          <div class="header">
            <div class="user-data">
              <div>
                <span class="name">{{ UserInfo.profile.nickname }}</span>
                <span class="vip"></span>
                <span class="u-icon2 u-icn2">
                  8
                  <i class="u-icon2 u-icn2-lev"></i>
                </span>
                <span class="iconfont icon-nan nan"></span>
              </div>
              <div>
                <button class="classify">编辑个人资料</button>
              </div>
            </div>
            <div class="user-detail">
              <div class="state">
                <ul>
                  <li>
                    <p>0</p>
                    <p>动态</p>
                  </li>
                  <li>
                    <p>35</p>
                    <p>关注</p>
                  </li>
                  <li>
                    <p>4</p>
                    <p>粉丝</p>
                  </li>
                </ul>
              </div>
              <div class="detail">
                <p>个人介绍 : {{ UserInfo.profile.signature }}</p>
                <p>所在地区 : 湖北武汉</p>
                <p>年龄 : 95后</p>
              </div>
            </div>
          </div>
        </div>
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
              <li @click="playMusic(item.song.id)" :class="{ gehang: (index + 1) % 2 == 0, currentPlay: musicId == item.song.id }" v-for="(item, index) in partList" :key="item.song.id">
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
            <p class="more" @click="more">查看更多 <i class="iconfont icon-gengduo gengduo"></i></p>
          </div>
          <!-- 创建的歌单 -->
          <div class="establish">
            <div class="header-establish">
              <h2>我创建的歌单 (2)</h2>
              <ul>
                <li>
                  <div class="songUrl">
                    <img src="https://p1.music.126.net/9-rm4PUkKuL-lD1Rgg6SDw==/109951165434984508.jpg?param=140y140" alt="" />
                  </div>
                  <p class="songList-name">呵呵呵呵或或或呵呵呵呵或或或呵呵呵呵或或或</p>
                </li>
              </ul>
            </div>
          </div>
          <!-- 收藏的歌单 -->
          <div class="collect">
            <div class="header-collect">
              <h2>我的收藏歌单 (9999)</h2>
              <ul>
                <li>
                  <div class="songUrl">
                    <img src="https://p1.music.126.net/DC1BLdPX5tCDQA_eYAlbMw==/109951164997238184.jpg?param=140y140" alt="" />
                  </div>
                  <p class="songList-name">呵呵呵呵或或或呵呵呵呵或或或呵呵呵呵或或或</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <router-view v-else @flag1="flag2" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      flag: true,
      type: 1,
      songList: [], // 完整记录
      partList: [] // 部分记录
    }
  },
  computed: {
    ...mapState(['UserInfo', 'musicId'])
  },
  created() {
    this.getSongList()
  },
  methods: {
    // 获取用户播放记录
    async getSongList() {
      let res = await this.$http.get('/user/record', { params: { uid: this.UserInfo.profile.userId, type: this.type } })
      this.type == 1 ? (this.songList = res.weekData) : (this.songList = res.allData)
      this.type == 1 ? (this.partList = res.weekData.slice(0, 10)) : (this.partList = res.allData.slice(0, 10))
      console.log(res)
    },
    // 点击最近一周或者所有时间
    getSong(type) {
      this.type = type
      this.getSongList()
    },
    more() {
      this.flag = false
      this.$router.replace('/user/songlist')
    },
    flag2(flag) {
      this.flag = flag
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
.header-warp {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.portrait {
  flex: 3;
}
.portrait img {
  width: 180px;
  height: 180px;
  padding: 5px;
  border: 1px solid #ccc;
  margin-left: 50%;
  transform: translateX(-50%);
}
.header {
  padding: 20px;
  flex: 7;
  display: flex;
  flex-direction: column;
}
.user-data {
  display: flex;
  padding: 10px;
  padding-bottom: 20px;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
}
.classify {
  padding: 5px 10px;
  font-size: 12px;
  color: #555;
}
.state ul {
  overflow: hidden;
}
.state ul li {
  float: left;
  margin: 10px 10px;
  padding: 0 20px;
  border-left: 1px solid #ccc;
}

.state ul li:first-child {
  border-left: 0;
  margin-left: 0;
  padding-left: 10px;
}
.detail {
  font-size: 12px;
  color: #666;
  line-height: 2;
  margin-left: 10px;
}
.name {
  font-size: 22px;
}
.vip {
  display: inline-block;
  width: 60px;
  height: 20px;
  background: url(https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4357872257/9f40/483a/0341/78d106c94bf17f8f1e98a2f6748061c4.png) no-repeat;
  background-size: 60px;
  vertical-align: middle;
  margin: 0 10px;
}
.u-icn2 {
  display: inline-block;
  width: 40px;
  height: 20px;
  text-align: right;
  padding-left: 10px;
  color: #e03a24;
  font-size: 14px;
  font-weight: 600;
  background-position: -135px -190px;
  vertical-align: middle;
  margin-right: 10px;
}
.u-icn2-lev {
  display: inline-block;
  width: 9px;
  height: 16px;
  background-position: -191px -190px;
  overflow: hidden;
}
.nan {
  color: #26a6e4;
  font-size: 20px;
}
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
.header-establish,
.header-collect {
  margin: 20px 0;
}
.header-establish h2,
.header-collect h2 {
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 10px;
  border-bottom: 2px solid #c20c0c;
}
.header-establish ul,
.header-collect ul {
  display: flex;
  flex-wrap: wrap;
  text-align: center;
}
.header-establish ul li,
.header-collect ul li {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20%;
  margin-top: 20px;
}
.songUrl img {
  width: 140px;
  height: 140px;
}
.songList-name {
  width: 140px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.more {
  font-size: 12px;
  padding: 10px;
  cursor: pointer;
  text-align: right;
  font-weight: 600;
}
.gengduo {
  font-size: 12px;
}
</style>

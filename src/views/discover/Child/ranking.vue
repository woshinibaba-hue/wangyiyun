<template>
  <div>
    <div class="warp">
      <div class="ranking_warp">
        <ul>
          <h2 class="f-fff1">云音乐特色榜</h2>
          <!-- class="current"  高亮显示 -->
          <li :class="{ current: currentId == item.id }" v-for="item in featureList" :key="item.id" @click="getDetails(item.id)">
            <img :src="item.coverImgUrl" alt="" class="item-img" />
            <div class="update">
              <p class="s-fc0">{{ item.name }}</p>
              <p class="s-fc4">{{ item.updateFrequency }}</p>
            </div>
          </li>
        </ul>
        <ul>
          <h2 class="f-fff1">全球媒体榜</h2>
          <li :class="{ current: currentId == item.id }" v-for="item in mediaList" :key="item.id" @click="getDetails(item.id)">
            <img :src="item.coverImgUrl" alt="" class="item-img" />
            <div class="update">
              <p class="s-fc0">{{ item.name }}</p>
              <p class="s-fc4">{{ item.updateFrequency }}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="ranking_details">
        <div class="header">
          <div class="title-img">
            <img :src="playList.coverImgUrl" alt="" class="coverImg" />
          </div>
          <div class="details">
            <div class="hd">
              <h2>{{ playList.name }}</h2>
            </div>
            <div class="update-date">
              <i class="u-icon u-icon57"></i>
              <span class="s-date">
                最近更新：
                <span class="date">
                  {{ playList.updateTime | formatDate }}
                </span>
              </span>
              <span class="s-update">
                （刚刚更新）
              </span>
            </div>
            <div class="btns">
              <span class="play iconfont icon-bofang">播放</span>
              <span class="add iconfont icon-tianjia">下载</span>
              <span class="collect iconfont icon-shoucang">(99999)</span>
              <span class="share iconfont icon-fenxiang">(10000)</span>
              <span class="dow iconfont icon-xiazai">下载</span>
              <span class="comment iconfont icon-pinglun">(9999)</span>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="song_head">
            <h2>
              歌曲列表
              <span>{{ playList.trackCount }}首歌</span>
            </h2>
            <span
              >播放: <span class="count red">{{ playList.playCount | playNum }}</span> 万次</span
            >
          </div>
          <div class="song_list">
            <table>
              <thead>
                <tr>
                  <td></td>
                  <td>标题</td>
                  <td>时长</td>
                  <td>歌手</td>
                </tr>
              </thead>
              <tbody>
                <tr @click="playMusic(item.id)" :class="{ geh: (index + 1) % 2 == 0 }" v-for="(item, index) in playList.tracks" :key="item.id">
                  <td class="ranking">
                    {{ index + 1 }}
                    <i class="u-icon jt-icon"></i>
                  </td>
                  <td>
                    <div class="song">
                      <img v-if="index + 1 <= 3" :src="item.al.picUrl" alt="" class="song-img" />
                      <i class="iconfont icon-bofang bofang"></i>
                      <span class="song-name">{{ item.al.name }}</span>
                    </div>
                  </td>
                  <td class="song-date">
                    {{ item.dt | formatTime }}
                  </td>
                  <td class="sing-name">
                    {{ item.ar[0].name }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <Floor />
  </div>
</template>

<script>
import Floor from '../../../components/Floor'
export default {
  data() {
    return {
      featureList: [], // 特色榜单
      mediaList: [], // 媒体榜单
      currentId: 19723756, // 当前点击的榜单id
      playList: {} // 榜单详情
    }
  },
  components: {
    Floor
  },
  created() {
    this.getAllTop()
    this.getTopDetails(this.currentId)
  },
  methods: {
    // 获取所有榜单
    async getAllTop() {
      const { list } = await this.$http.get('/toplist')
      this.featureList = list.slice(0, 4)
      this.mediaList = list.slice(4)
    },
    // 点击榜单 获取当前榜单id
    getDetails(id) {
      this.currentId = id
      this.getTopDetails(id)
    },
    // 获取榜单歌曲
    async getTopDetails(id) {
      const { playlist } = await this.$http.get('/playlist/detail', { params: { id } })
      this.$store.commit('SetMusicList', playlist.tracks)
      this.playList = playlist
    },
    // 点击歌曲播放音乐
    async playMusic(id) {
      this.$store.dispatch('getMusic', id)
    }
  }
}
</script>

<style scoped>
.warp {
  display: flex;
  width: 70%;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-top: 0;
  background-color: #fff;
}
.song-img {
  width: 50px;
}
.coverImg {
  width: 150px;
}
.item-img {
  width: 40px;
}
.s-fc0,
.s-fc4 {
  font-size: 12px;
  color: #000;
  line-height: 20px;
}
.u-icon {
  background: url('../../../assets/images/icon.png') no-repeat 0 999999px;
}
.s-fc4 {
  color: #999;
}
.current {
  background-color: #e6e6e6;
}
.ranking_warp {
  flex: 130px;
  background-color: #f9f9f9;
  border-right: 1px solid #ccc;
  padding-bottom: 100px;
}
.ranking_warp ul {
  margin-top: 30px;
  box-sizing: border-box;
}
.ranking_warp ul li img {
  margin-right: 15px;
}
.ranking_warp ul li {
  display: flex;
  margin-top: 10px;
  padding: 5px 0 5px 15px;
  cursor: pointer;
}
.ranking_warp ul li:hover {
  background-color: #f4f2f2;
}
.f-fff1 {
  font-size: 14px;
  padding: 0 10px 5px 15px;
  font-family: SimSun;
}
.ranking_details {
  flex: 8;
  padding: 40px;
}
.ranking_details .header {
  display: flex;
}
.title-img {
  width: 150px;
  height: 150px;
  padding: 3px;
  margin-right: 30px;
  border: 1px solid #ccc;
}
.hd h2 {
  font-size: 20px;
  font-weight: normal;
  margin-top: 20px;
}
.update-date {
  margin: 20px 0;
}
.u-icon57 {
  display: inline-block;
  width: 13px;
  height: 13px;
  background-position: -18px -682px;
  vertical-align: middle;
}
.s-date,
.s-update {
  font-size: 12px;
  margin-left: 5px;
}
.s-update {
  color: #999;
}
.btns span {
  display: inline-block;
  width: 80px;
  border: 1px solid #c4c4c4;
  font-size: 12px;
  line-height: 30px;
  text-align: center;
  margin-right: 10px;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0px 0px 7px -1px rgba(0, 0, 0, 0.3);
}
.song_head {
  display: flex;
  justify-content: space-between;
  margin: 30px 0 5px 0;
}
.song_head h2 {
  font-weight: normal;
  font-size: 20px;
}
.song_head span {
  font-size: 12px;
  font-weight: normal;
  color: #999;
}
.song_list {
  border: 1px solid #c4c4c4;
  border-top: 2px solid #c10d0c;
}
table {
  border-collapse: collapse;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
thead tr td {
  border-top: 0;
  border: 1px solid #c4c4c4;
  border-right: 0;
  padding: 5px 10px;
}
thead tr td:first-child {
  border-left: 0;
}
tbody tr td {
  padding: 5px 10px;
}
.ranking {
  width: 100px;
}
.song {
  width: 400px;
  display: flex;
  align-items: center;
}
.bofang {
  margin-left: 30px;
}
.jt-icon {
  float: right;
  width: 20px;
  height: 20px;
  background-position: -74px -299px;
}
.song-date {
  width: 100px;
}
.sing-name {
  width: 200px;
}
.geh {
  background-color: #f7f7f7;
}
</style>

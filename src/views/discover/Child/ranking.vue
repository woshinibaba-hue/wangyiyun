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
              <span class="add iconfont icon-tianjia">添加</span>
              <span class="collect iconfont icon-shoucang">({{ playList.subscribedCount }})</span>
              <span class="share iconfont icon-fenxiang">({{ playList.shareCount }})</span>
              <span class="dow iconfont icon-xiazai">下载</span>
              <span class="comment iconfont icon-pinglun">({{ playList.commentCount }})</span>
            </div>
          </div>
        </div>
        <div>
          <div class="song_head">
            <h2>
              歌曲列表
              <span>999 首歌</span>
            </h2>
            <span>播放: <span class="count red">999</span> 万次</span>
          </div>
          <SongList :playList="playList.tracks"></SongList>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SongList from '../../../components/SongList'
export default {
  data() {
    return {
      featureList: [], // 特色榜单
      mediaList: [], // 媒体榜单
      currentId: '', // 当前点击的榜单id
      playList: {} // 榜单详情
    }
  },
  computed: {
    ...mapState(['musicId'])
  },
  components: {
    SongList
  },
  created() {
    this.currentId = this.$route.query.id ? this.$route.query.id : '19723756'
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
      this.playList = playlist
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
</style>

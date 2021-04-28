<template>
  <div>
    <div class="warp box">
      <div class="song-header">
        <div class="box1">
          <div class="songListImg">
            <img :src="playList.coverImgUrl" alt="" />
          </div>
          <div class="song-introduce">
            <p class="title">
              <i class="icon1 gedan"></i>
              <span class="text">{{ playList.name }}</span>
            </p>
            <p class="creator">
              <img class="hadeImg" :src="playList.creator && playList.creator.avatarUrl" alt="" />
              <span class="monicker">{{ playList.creator && playList.creator.nickname }}</span>
              <img class="icon2" :src="playList.creator.avatarDetail && playList.creator.avatarDetail.identityIconUrl" alt="" />
              <span class="date">{{ playList.createTime | formatDate }}创建</span>
            </p>
            <div class="btns">
              <span class="play iconfont icon-bofang">播放</span>
              <span class="add iconfont icon-tianjia">添加</span>
              <span class="collect iconfont icon-shoucang">({{ playList.subscribedCount }})</span>
              <span class="share iconfont icon-fenxiang">({{ playList.shareCount }})</span>
              <span class="dow iconfont icon-xiazai">下载</span>
              <span class="comment iconfont icon-pinglun">({{ playList.commentCount }})</span>
            </div>
            <div class="tags">
              标签 :
              <span v-for="(item, index) in playList.tags" :key="index">{{ item }}</span>
            </div>
            <div class="introduce-text">
              <p>
                介绍 :
                {{ playList.description }}
              </p>
            </div>
          </div>
        </div>
        <div class="song-wrap">
          <div class="wrap-header">
            <div class="list">
              <h2>歌曲列表</h2>
              <span>{{ playList.trackCount }} 首歌</span>
            </div>
            <span class="num"
              >播放 : <span class="count red">{{ playList.playCount | playNum }}</span
              >次</span
            >
          </div>
          <!-- 歌曲列表 -->
          <div>
            <SongList :playList="playList.tracks"></SongList>
            <h3 style="margin-left:40%">前往APP解锁更多歌曲</h3>
          </div>
        </div>
        <Comment :id="MusicId"></Comment>
      </div>
      <div class="more">
        <div class="like">
          <p>喜欢这个歌单的人</p>
          <ul>
            <li v-for="(item, index) in playList.subscribers" :key="index">
              <img :src="item.avatarUrl" alt="" />
            </li>
          </ul>
        </div>
        <div class="recommend">
          <p>相关推荐</p>
          <ul>
            <li v-for="item in relatedList" :key="item.id">
              <div class="t-img">
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <div class="t-text">
                <p>{{ item.name }}</p>
                <p>
                  <span class="by">by</span>
                  <span class="come">{{ item.creator.nickname }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Comment from '../../components/Comment'
import SongList from '../../components/SongList'
export default {
  data() {
    return {
      playList: {}, // 歌单详情
      relatedList: [], // 相关推荐
      MusicId: '' // 当前歌单id
    }
  },
  components: {
    Comment,
    SongList
  },
  created() {
    this.getList()
    this.getCorrelation()
  },
  methods: {
    // 获取当前歌单数据
    async getList() {
      let { id } = this.$route.query
      this.MusicId = id
      let { playlist } = await this.$http.get('/playlist/detail', { params: { id } })
      this.playList = playlist
    },
    // 获取相关推荐
    async getCorrelation() {
      const { playlists } = await this.$http.get('/related/playlist', { params: { id: this.$route.query.id } })
      this.relatedList = playlists
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
}
.icon1 {
  background: url('../../assets/images/icon.png') 0 9999px no-repeat;
}
.song-header {
  /* flex: 7; */
  width: 810px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ccc;
}
.box1 {
  display: flex;
}
.more {
  flex: 2;
  margin-left: 20px;
}
.songListImg {
  width: 240px;
}
.songListImg img {
  width: 180px;
  height: 180px;
  padding: 5px;
  border: 1px solid #ccc;
}
.song-introduce {
  flex: 7;
  padding-right: 18px;
}
.gedan {
  display: inline-block;
  width: 54px;
  height: 24px;
  background-position: 0 -243px;
  vertical-align: middle;
}
.text {
  font-size: 18px;
  margin-left: 15px;
  vertical-align: middle;
}
.creator {
  display: flex;
  align-items: center;
  margin: 10px 0;
}
.hadeImg {
  width: 35px;
  margin-right: 10px;
}
.icon2 {
  width: 13px;
  margin-left: 2px;
}
.monicker {
  color: #0c73c2;
  font-size: 12px;
}
.date {
  font-size: 12px;
  color: #999;
  margin-left: 20px;
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
.tags {
  font-size: 12px;
  color: #999;
  margin: 10px 0;
}
.tags span {
  display: inline-block;
  line-height: 22px;
  margin: 0 8px;
  padding: 0 5px;
  text-align: center;
  border: 1px solid #ccc;
  background-image: linear-gradient(#efefef, #f3f3f3);
  border-radius: 15px;
  cursor: pointer;
}
.introduce-text {
  font-size: 12px;
  color: #999;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.song-wrap {
  margin-top: 40px;
}
.wrap-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.list {
  display: flex;
  align-items: flex-end;
}
.list h2 {
  font-weight: 500;
  font-size: 20px;
}
.list span {
  margin-left: 20px;
  font-size: 13px;
  color: #666;
}
.num {
  margin-right: 15px;
  font-size: 12px;
}
.count {
  font-weight: 700;
}
.like p,
.recommend > p {
  padding-bottom: 10px;
  font-size: 12px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
}
.like ul {
  display: flex;
  flex-wrap: wrap;
  margin: 5px 0;
}
.like ul li {
  margin: 5px;
}
.like ul li img {
  width: 40px;
  height: 40px;
}
.recommend ul {
  margin-top: 20px;
}
.recommend ul li {
  width: 50px;
  display: flex;
  font-size: 14px;
  margin: 8px 0;
}
.t-img img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
.t-text > p {
  width: 160px;
  line-height: 1.8;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.by,
.come {
  font-size: 12px;
  color: #999;
  margin-right: 5px;
}
.come {
  font-size: 12px;
  color: #333;
}
</style>

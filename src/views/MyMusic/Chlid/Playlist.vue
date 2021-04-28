<template>
  <div class="box">
    <div class="header">
      <div class="left">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="rigth">
        <div class="list-name">
          <p class="icon"></p>
          <span class="like-t">{{ playlist.name }}</span>
        </div>
        <div class="list-a">
          <div class="a-img">
            <img :src="playlist.creator && playlist.creator.avatarUrl" alt="" />
          </div>
          <p class="a-name">{{ playlist.creator && playlist.creator.nickname }}</p>
          <p class="s-date">{{ playlist.createTime | formatDate }} 创建</p>
        </div>
        <div class="btns">
          <span class="play iconfont icon-bofang">播放</span>
          <span class="add iconfont icon-tianjia">添加</span>
          <span class="collect iconfont icon-shoucang">(999)</span>
          <span class="share iconfont icon-fenxiang">(999)</span>
          <span class="dow iconfont icon-xiazai">下载</span>
          <span class="comment iconfont icon-pinglun">(999)</span>
        </div>
        <div class="referral">
          <p v-if="playlist.description">
            介绍 :
            {{ playlist.description }}
          </p>
        </div>
      </div>
    </div>
    <div class="song-list">
      <div class="song_head">
        <h2>
          歌曲列表
          <span>999 首歌</span>
        </h2>
        <span>播放: <span class="count red">999</span> 万次</span>
      </div>
      <SongList :playList="playlist.tracks"></SongList>
      <h2>下载网易云音乐APP解锁更多歌曲！！！</h2>
    </div>
  </div>
</template>

<script>
import SongList from '../../../components/SongList'
export default {
  props: ['id'],
  watch: {
    // 监视id变化之后，调用函数重新获取歌单列表数据
    id() {
      this.playlist = {}
      this.getSongList()
    }
  },
  data() {
    return {
      playlist: {} // 歌单数据
    }
  },
  components: {
    SongList
  },

  created() {
    this.getSongList()
  },
  methods: {
    // 获取歌单列表数据
    async getSongList() {
      let res = await this.$http.get('/playlist/detail', { params: { id: this.id } })
      this.playlist = res.playlist
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  padding: 30px;
}
.header {
  display: flex;
}
.left {
  flex: 3;
}
.left img {
  width: 200px;
  height: 200px;
  padding: 3px;
  border: 1px solid #ccc;
}
.rigth {
  flex: 7;
}
.list-name {
  display: flex;
  align-items: center;
}
.list-name .icon {
  width: 54px;
  height: 24px;
  background: url('../../../assets/images/icon.png') no-repeat 0 -243px;
}
.list-name .like-t {
  font-size: 20px;
  color: #333;
  margin-left: 10px;
}
.list-a {
  display: flex;
  align-items: center;
  margin: 15px 0;
}
.list-a .a-img img {
  width: 35px;
  height: 35px;
}
.a-name,
.s-date {
  margin: 0 6px 0 10px;
  font-size: 12px;
  color: #0c73c2;
}
.s-date {
  color: #ccc;
}
.referral {
  margin-top: 10px;
  font-size: 12px;
  color: #666;
  word-break: break-all;
  text-overflow: ellipsis;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>

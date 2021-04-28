<template>
  <div class="warp">
    <div class="left">
      <div class="head">
        <Date class="date" />
      </div>
      <h3 class="title">
        歌曲列表 <span class="count">{{ playList && playList.length }}首歌</span>
      </h3>
      <SongList :playList="playList"></SongList>
    </div>
    <div class="right">2</div>
  </div>
</template>

<script>
import Date from '../../components/Date'
import SongList from '../../components/SongList'
export default {
  data() {
    return {
      playList: []
    }
  },
  created() {
    this.getSongList()
  },
  components: {
    Date,
    SongList
  },
  methods: {
    // 获取每日推荐歌单数据
    async getSongList() {
      const { data } = await this.$http.get('/recommend/songs')
      this.playList = data.dailySongs
    }
  }
}
</script>

<style scoped>
.warp {
  display: flex;
}
.left {
  flex: 7;
  padding-right: 30px;
  border-right: 1px solid #ccc;
}
.head {
  width: 640px;
  height: 179px;
  padding-top: 1px;
  background: url('https://s2.music.126.net/style/web2/img/recmd_daily.jpg?110da4e6dfb28e7473f83081b5b3b8bb') no-repeat;
  border-radius: 5px;
  margin-left: 50%;
  transform: translateX(-50%);
}
.title {
  margin: 20px 0;
  font-weight: 400;
}
.count {
  margin-left: 20px;
  font-size: 12px;
  color: #666;
}
.date {
  margin: 20px 0 0 20px;
}
.right {
  flex: 3;
}
</style>

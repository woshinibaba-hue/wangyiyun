<template>
  <div class="warp" ref="warp">
    <h2 v-if="!UserInfo.isLogin">请登录之后再查看</h2>
    <div v-else class="box">
      <div class="left" ref="wrapper">
        <ul class="nav">
          <li @click="goList('/mymusic/artist')" :class="{ gaoliang: $route.path.indexOf('artist') !== -1 }">我的歌手 (99)</li>
          <li @click="goList('/mymusic/mv')" :class="{ gaoliang: $route.path.indexOf('mv') !== -1 }">我的视频 (99)</li>
          <li @click="goList('/mymusic/radio')" :class="{ gaoliang: $route.path.indexOf('radio') !== -1 }">我的电台 (99)</li>
          <li @click="isShow = !isShow">
            <i class="iconfont icon" :class="!isShow ? 'icon-xiala' : 'icon-shangla1'"></i>
            创建的歌单 ({{ userPlay.length }})
          </li>
          <ul class="nav-c" v-show="isShow">
            <li @click="goList(`/mymusic/playlist?id=${item.id}`)" :class="$route.path.indexOf('playlist') !== -1 && playId == item.id ? 'gaoliang' : ''" v-for="item in userPlay" :key="item.id">
              <div class="list-img">
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <div class="text">
                <p class="like">{{ item.name }}</p>
                <p class="count">{{ item.trackCount }}首</p>
              </div>
            </li>
          </ul>
          <li @click="isShow1 = !isShow1">
            <i class="iconfont icon" :class="!isShow1 ? 'icon-xiala' : 'icon-shangla1'"></i>
            收藏的歌单 (99)
          </li>
          <ul class="nav-c" v-show="isShow1">
            <li @click="goList(`/mymusic/playlist?id=${item.id}`)" :class="$route.path.indexOf('playlist') !== -1 && playId == item.id ? 'gaoliang' : ''" v-for="item in playList" :key="item.id">
              <div class="list-img">
                <img :src="item.coverImgUrl" alt="" />
              </div>
              <div class="text">
                <p class="like">{{ item.name }}</p>
                <p class="count">{{ item.trackCount }}首 by {{ item.creator.nickname }}</p>
              </div>
            </li>
          </ul>
        </ul>
      </div>
      <div class="right">
        <router-view :id="playId"></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      isShow: true,
      isShow1: false,
      userPlay: [], // 自己创建的歌单
      playList: [], // 收藏的歌单
      playId: '' // 当前歌单id
    }
  },
  created() {
    this.getList()
    this.$nextTick(() => {
      console.dir(this.$refs.warp)
    })
  },
  computed: {
    ...mapState(['UserInfo'])
  },
  methods: {
    goList(path) {
      this.$router.push(path)
      if (this.$route.query.id) {
        console.log(this.$route.query.id)
        this.playId = this.$route.query.id
      }
      if (path == '/mymusic/playlist') {
        this.getList()
      }
    },
    // 获取歌单数据
    async getList() {
      let res = await this.$http.get('/user/playlist', { params: { uid: this.UserInfo.profile.userId } })
      this.userPlay = []
      this.playList = []
      res.playlist.forEach(item => {
        if (item.subscribed) {
          this.playList.push(item)
        } else {
          this.userPlay.push(item)
        }
      })
    }
  }
}
</script>

<style scoped>
.warp > h2 {
  padding: 40px;
  height: 100%;
  text-align: center;
}
.warp {
  padding: 0;
}
.box {
  display: flex;
}
.left {
  width: 200px;
  border-right: 1px solid #ccc;
}
.left .nav {
  padding: 40px 0;
  box-sizing: border-box;
  height: 100%;
  background-color: #f9f9f9;
}
.icon {
  font-size: 12px;
  margin-right: 8px;
}
.left .nav > li {
  padding: 8px 25px;
  font-size: 12px;
  color: rgb(51, 51, 51);
  text-size-adjust: none;
  cursor: pointer;
}
.left ul li:hover {
  background-color: #eee;
}
.nav-c > li {
  display: flex;
  padding: 8px 30px;
  cursor: pointer;
}
.text {
  margin-left: 15px;
}
.like,
.count {
  width: 100px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.count {
  margin-top: 8px;
  font-size: 10px;
  color: #999;
}
.list-img img {
  width: 40px;
  height: 40px;
}
.right {
  flex: 1;
}
</style>

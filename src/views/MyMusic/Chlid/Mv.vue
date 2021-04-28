<template>
  <div class="box">
    <MyHeader>
      <template v-slot:title>
        <h2 class="head">我的视频({{ count }})</h2>
      </template>
    </MyHeader>
    <ul class="main">
      <li v-for="item in MvList" :key="item.vid">
        <div class="mv-img">
          <p class="count iconfont icon-shipin">&nbsp;{{ item.playTime | playNum }}</p>
          <img :src="item && item.coverUrl" alt="" />
          <p class="dt">{{ item.durationms | formatTime }}</p>
        </div>
        <div class="text">
          <p class="mv-name">{{ item.title }}</p>
          <p class="name">{{ item.creator[0].userName }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import MyHeader from '../../../components/MyHeader'
export default {
  data() {
    return {
      count: '', // mv数量
      MvList: [] // mv列表
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.getMvList()
  },
  methods: {
    // 获取收藏的视频
    async getMvList() {
      let res = await this.$http.get('/mv/sublist')
      this.count = res.count
      this.MvList = res.data
    }
  }
}
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
}
.main {
  display: flex;
  flex-wrap: wrap;
}
.main li {
  width: 25%;
  margin: 10px 0;
}
.main li .mv-img {
  position: relative;
  width: 90%;
  overflow: hidden;
}
.main li .mv-img img {
  width: 100%;
  height: 90px;
}
.count,
.dt {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  text-align: right;
  color: #fff;
  font-size: 12px;
  padding: 3px 8px;
  background-color: rgba(0, 0, 0, 0.4);
}
.dt {
  top: 68px;
  left: 0;
  text-align: left;
}
.mv-name,
.name {
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 12px;
}
.name {
  font-size: 10px;
  color: #666;
}
</style>

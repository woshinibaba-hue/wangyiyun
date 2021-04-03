<template>
  <div>
    <div class="nav">
      <ul class="classify">
        <li :class="{ current: this.$route.path == '/discover/recommend' }" @click="goTo('/discover/recommend')">推荐</li>
        <li :class="{ current: this.$route.path == '/discover/ranking' }" @click="goTo('/discover/ranking')">排行榜</li>
        <li :class="{ current: this.$route.path == '/discover/song' }" @click="goTo('/discover/song')">歌单</li>
        <li :class="{ current: this.$route.path == '/discover/station' }" @click="goTo('/discover/station')">主播电台</li>
        <li :class="{ current: this.$route.path == '/discover/sing' }" @click="goTo('/discover/sing')">歌手</li>
        <li :class="{ current: this.$route.path == '/discover/putaway' }" @click="goTo('/discover/putaway')">新碟上架</li>
      </ul>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    // 编程式导航跳转
    goTo(path) {
      this.$router.push(path)
    }
  }
}
</script>

<style scoped>
.nav {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 30px;
  background-color: #c20c0c;
}
.classify {
  display: flex;
  align-items: center;
  width: 50%;
  overflow: hidden;
  margin-left: 50px;
}
.classify li {
  padding: 3px 10px;
  margin-right: 15px;
  font-size: 10px;
  color: #fff;
  cursor: pointer;
}
.classify li:hover {
  background-color: #9b0909;
  border-radius: 15px;
}
.current {
  background-color: #9b0909;
  border-radius: 15px;
}
</style>

<template>
  <div class="box">
    <div class="wrap">
      <div class="logo"></div>
      <ul class="main">
        <li @click="goTo('/discover')" :class="{ current: $route.path == '/discover' }">发现音乐</li>
        <li @click="goTo('/my')" :class="{ current: $route.path == '/my' }">我的音乐</li>
        <li @click="goTo('/friend')" :class="{ current: $route.path == '/friend' }">朋友</li>
        <li @click="goTo('/shopping')" :class="{ current: $route.path == '/shopping' }">商城</li>
        <li @click="goTo('/musician')" :class="{ current: $route.path == '/musician' }">音乐人</li>
        <li @click="goTo('/client')" :class="{ current: $route.path == '/client' }">下载客户端</li>
      </ul>
      <div class="search">
        <el-input class="input" placeholder="音乐/视频/电台/用户" prefix-icon="iconfont icon-sousuo"></el-input>
        <span class="creation">创作者中心</span>
      </div>
      <div class="login">
        <p>登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      path: ''
    }
  },
  methods: {
    // 点击导航跳转指定路由
    goTo(path) {
      if (path !== this.path) {
        this.$router.push({ path })
      }
      this.path = path
    }
  }
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 70px;
  background-color: #242424;
}
.wrap {
  display: flex;
  height: 100%;
}
.logo,
.main,
.search {
  height: 100%;
}
.logo {
  flex: 2;
  background: url(../../assets/topbar.png) no-repeat 0 0;
  margin-left: 10px;
}
.main {
  flex: 8;
  color: #fff;
  line-height: 70px;
}
.main li {
  float: left;
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
  transition: all 0.3s;
}
.search {
  flex: 4;
  line-height: 70px;
}
.input {
  font-size: 12px;
  width: 160px;
  border-radius: 20px;
}
.current {
  position: relative;
  background-color: #000;
}
.current::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border: 8px solid transparent;
  border-bottom-color: #c00014;
}
.creation {
  opacity: 0.5;
  transition: all 0.3s;
  color: #fff;
  font-size: 12px;
  margin: 0 15px;
  border: 1px solid #fff;
  padding: 5px 8px;
  border-radius: 15px;
  cursor: pointer;
}
.creation:hover {
  opacity: 1;
}
.login {
  cursor: pointer;
  opacity: 0.5;
  color: #fff;
  font-size: 14px;
  line-height: 70px;
  margin-left: -50px;
}
.login:hover {
  opacity: 0.8;
}
</style>

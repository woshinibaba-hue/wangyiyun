<template>
  <div class="box">
    <div class="wrap">
      <div class="logo"></div>
      <ul class="main">
        <li @click="goTo('/discover')" :class="{ current: $route.path.indexOf('/discover') !== -1 }">发现音乐</li>
        <li @click="goTo('/my')" :class="{ current: $route.path == '/my' }">我的音乐</li>
        <li @click="goTo('/friend')" :class="{ current: $route.path == '/friend' }">朋友</li>
        <li @click="goTo('/shopping')" :class="{ current: $route.path == '/shopping' }">商城</li>
        <li @click="goTo('/musician')" :class="{ current: $route.path == '/musician' }">音乐人</li>
        <li @click="goTo('/client')" :class="{ current: $route.path == '/client' }">下载客户端</li>
      </ul>
      <div class="search">
        <span class="sousuo iconfont icon-sousuo"></span>
        <input v-model="search" class="input" v-on:keyup.enter="toSearch" placeholder="音乐/视频/电台/用户" />
        <span class="creation">创作者中心</span>
      </div>
      <div class="login">
        <p @click="login">登录</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['showLogin'],
  data() {
    return {
      path: '',
      search: ''
    }
  },
  methods: {
    // 点击导航跳转指定路由
    goTo(path) {
      if (path !== this.path) {
        this.$router.push({ path })
      }
      this.path = path
    },
    // 点击登录
    login() {
      this.$emit('show', !this.showLogin)
    },
    //跳转至搜索页面
    toSearch() {
      if (this.$route.path == '/search') {
        return
      }
      this.$router.push(`/search?key=${this.search}`)
    }
  }
}
</script>

<style scoped>
@import '../../assets/font/iconfont.css';
.box {
  width: 100%;
  height: 70px;
  background-color: #242424;
  border-bottom: 5px solid #c20c0c;
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
  margin-right: 10px;
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
  position: relative;
  flex: 4;
  line-height: 70px;
}
.sousuo {
  position: absolute;
  left: 15px;
  top: 2px;
  width: 20px;
  height: 20px;
  color: #999;
}
.input {
  font-size: 10px;
  width: 120px;
  border-radius: 20px;
  padding: 10px 0 10px 35px;
  outline-style: none;
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

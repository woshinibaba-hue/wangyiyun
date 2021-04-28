<template>
	<!-- 头部 -->
	<div class="box">
		<div class="wrap">
			<div class="logo"></div>
			<ul class="main">
				<li @click="goTo('/discover')" :class="{ current: $route.path.indexOf('/discover') !== -1 }">发现音乐</li>
				<li @click="goTo('/mymusic')" :class="{ current: $route.path.indexOf('/mymusic') !== -1 }">我的音乐</li>
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
			<div class="login" v-if="!UserInfo.isLogin">
				<p class="login-btn" @click="login">登录</p>
			</div>
			<div class="avatar" @click="click" v-else>
				<img :src="UserInfo.profile.avatarUrl" alt="" />
			</div>
			<div class="login-avatar" v-if="isShow">
				<ul>
					<li @click="goUser">
						<p><i class="iconfont icon-icon-test"></i> 我的主页</p>
					</li>
					<li>
						<p><i class="iconfont icon-xiaoxi"></i> 我的消息</p>
					</li>
					<li>
						<p><i class="iconfont icon-dengji"></i> 我的等级</p>
					</li>
					<li>
						<p><i class="iconfont icon-VIP"></i> VIP会员</p>
					</li>
					<li>
						<p><i class="iconfont icon-shezhi"></i> 个人设置</p>
					</li>
					<li>
						<p><i class="iconfont icon-kefujingli-"></i> 实名认证</p>
					</li>
					<li>
						<p><i class="iconfont icon-guanji"></i> 退出</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: ['showLogin'],
	data() {
		return {
			path: '',
			search: '',
			isShow: false
		}
	},
	computed: {
		...mapState(['UserInfo'])
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
		},
		click() {
			this.isShow = !this.isShow
		},
		goUser() {
			this.$router.push('/user')
		}
	}
}
</script>

<style scoped>
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
	font-size: 14px;
	line-height: 70px;
	margin-left: -50px;
	cursor: pointer;
}
.login-btn {
	opacity: 0.9;
	color: #fff;
	cursor: pointer;
}
.avatar {
	position: absolute;
	right: 220px;
	top: 22px;
	width: 30px;
	height: 30px;
}
.avatar img {
	width: 30px;
	height: 30px;
	border-radius: 50%;
}
.avatar:hover .login-avatar {
	display: block;
}
.login-avatar {
	position: absolute;
	right: 155px;
	top: 60px;
	width: 120px;
	height: 200px;
	background-color: #2b2b2b;
	color: #ccc;
	font-size: 12px;
	z-index: 6;
	border-radius: 8px;
	overflow: hidden;
}
.iconfont {
	margin-right: 5px;
}
.login-avatar ul li {
	padding: 5px 10px;
	cursor: pointer;
	text-align: center;
}
.login-avatar ul li:nth-child(7) {
	margin-left: -26px;
}
.login-avatar ul li:hover {
	background-color: #353535;
	color: #fff;
}
</style>

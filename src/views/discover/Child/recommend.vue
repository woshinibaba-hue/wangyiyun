<template>
	<div>
		<div class="slideshow">
			<div class="blur" :style="{ 'background-image': 'url(' + currentImg + ')' }"></div>
			<el-carousel :interval="2000" autoplay height="300px" @change="toggle">
				<el-carousel-item v-for="(item, index) in imgs" :key="index">
					<img class="imgItem" :src="item.imageUrl" alt="" />
				</el-carousel-item>
			</el-carousel>
		</div>
		<div class="main">
			<div class="left">
				<!-- 热门推荐 -->
				<div>
					<div class="childNav">
						<span class="icon">
							<h3>热门推荐</h3>
							<ul class="classify">
								<li v-for="(item, index) in classify" :key="index">{{ item }}</li>
							</ul>
						</span>
						<span class="more">更多</span>
					</div>
					<div class="hot">
						<ul>
							<li v-for="item in hotList" :key="item.id" @click="goPlsyList(item.id)">
								<span class="mask">
									<span class="icon-headset"></span>
									<span class="count">{{ item.playCount | playNum }}</span>
									<span class="icon-play"></span>
								</span>
								<img :src="item.picUrl" alt="" />
								<p>{{ item.name }}</p>
							</li>
						</ul>
					</div>
				</div>
				<!-- 个性化推荐 -->
				<div v-if="UserInfo.isLogin">
					<div class="childNav">
						<span class="icon">
							<h3>个性化推荐</h3>
						</span>
					</div>
					<div class="new_disc">
						<div class="daily" @click="go">
							<DateBg />
							<p class="dec">每日歌曲推荐</p>
							<p class="update">根据你的口味生成，每天6:00更新</p>
						</div>
						<ul>
							<li v-for="item in recommends" :key="item.id" @click="goPlsyList(item.id)">
								<div class="disc-img">
									<img :src="item.picUrl" alt="" />
								</div>
								<div class="mask1">
									<span class="count">{{ item.playcount | playNum }}</span>
									<span class="icon-play"></span>
									<span class="icon-headset"></span>
								</div>
								<p class="text">{{ item.name }}</p>
								<p class="like-t">{{ item.copywriter }}</p>
							</li>
						</ul>
					</div>
				</div>
				<!-- 榜单 -->
				<div>
					<div class="childNav">
						<span class="icon">
							<h3>榜单</h3>
						</span>
						<span class="more">更多</span>
					</div>
					<div class="list">
						<div class="soaring" v-for="item in topList" :key="item.id">
							<div class="header">
								<img :src="item.coverImgUrl" alt="" />
								<div class="collect">
									<h3 class="title">{{ item.name }}</h3>
									<span class="play-icon"></span>
									<span class="like-icon"></span>
								</div>
							</div>
							<div class="songList">
								<ul>
									<li :class="{ interleave: (index + 1) % 2 == 0 }" v-for="(i, index) in item.tracks" :key="i.first">
										<span class="ranking red">{{ index + 1 }}</span>
										<span class="songName">{{ i.first }}</span>
										<div class="icons">
											<span class="play-song"></span>
											<span class="add-song"></span>
											<span class="like-song"></span>
										</div>
									</li>
									<li class="interleave">
										<span class="examine" @click="goRanking(item.id)">查看全部 ></span>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="right">
				<div class="loginBtn">
					<p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
					<div class="btn">
						<el-button type="danger" size="small ">用户登录</el-button>
					</div>
				</div>
				<div class="singer">
					<p>
						<span>热门歌手</span>
						<span>查看更多></span>
					</p>
				</div>
				<ul class="songerList">
					<li v-for="item in sings" :key="item.id">
						<img :src="item.picUrl" alt="" class="sing-pic" />
						<div class="details">
							<h4>{{ item.name }}</h4>
						</div>
					</li>
				</ul>
				<div class="apply">
					<el-button>申请成为网易音乐人</el-button>
				</div>
				<div class="anchor">
					<p>
						<span>热门主播</span>
					</p>
					<ul class="hot">
						<li v-for="item in hotPop" :key="item.id">
							<img :src="item.avatarUrl" alt="" class="avatar-img" />
							<div class="hotInfo">
								<p class="hotName">{{ item.nickName }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import DateBg from '../../../components/Date'
export default {
	data() {
		return {
			imgs: [], // 轮播图
			classify: ['华语', '流行', '摇滚', '民谣', '电子'],
			hotList: [], // 热门推荐歌单
			topList: [], // 榜单名
			hotPop: [], // 热门主播
			sings: [], // 歌手
			currentImg: '', // 当前轮播图片
			recommends: [] // 每日推荐歌单
		}
	},
	components: {
		DateBg
	},
	created() {
		this.getHotPop()
		this.getBanner()
		this.getHotList()
		this.getToplist()
		this.getSinger()
		this.getResource()
	},
	computed: {
		...mapState(['UserInfo'])
	},
	methods: {
		// 获取轮播图数据
		async getBanner() {
			const { banners } = await this.$http.get('/banner?type=0')
			this.imgs = banners
			this.currentImg = banners[0].imageUrl
		},
		// 获取热门推荐歌单
		async getHotList() {
			const { result } = await this.$http.get('/personalized?limit=8')
			this.hotList = result
		},
		// 获取榜单
		async getToplist() {
			const { list } = await this.$http.get('/toplist/detail')
			this.topList = list.slice(0, 3)
		},
		// 获取热门主播
		async getHotPop() {
			const { data } = await this.$http.get('/dj/toplist/popular', { params: { limit: 5 } })
			this.hotPop = data.list
		},
		// 获取歌手
		async getSinger() {
			const { list } = await this.$http.get('/toplist/artist')
			this.sings = list.artists.splice(0, 6)
		},
		toggle(i) {
			this.currentImg = this.imgs[i].imageUrl
		},
		// 获取每日推荐歌单
		async getResource() {
			let { recommend } = await this.$http.get('/recommend/resource')
			this.recommends = recommend.splice(0, 3)
		},
		go() {
			this.$router.push('/daily')
		},
		// 跳转至歌单详情
		goPlsyList(id) {
			this.$router.push(`/songdetails?id=${id}`)
		},
		// 跳转至榜单详情
		goRanking(id) {
			this.$router.push(`/discover/ranking?id=${id}`)
		}
	}
}
</script>

<style scoped>
html,
body {
	padding: 0;
	margin: 0;
}
.slideshow {
	border-bottom: 1px solid #eee;
}
.el-carousel {
	width: 70%;
	margin-left: 50%;
	filter: blur(0) !important;
	transform: translateX(-50%);
}
.blur {
	position: absolute;
	width: 100%;
	height: 300px;
	background-size: 999999px;
	background-position: right center;
}
.main {
	display: flex;
	width: 70%;
	margin: 0 auto;
	border: 1px solid #d3d3d3;
	border-top: 0;
	background-color: #fff;
}
.left {
	flex: 8;
	margin-top: 10px;
	padding: 0 20px;
}
.right {
	flex: 3;
	border-left: 2px solid #d3d3d3;
}
.childNav {
	border-bottom: 2px solid #c10d0c;
	margin-bottom: 15px;
}
.icon {
	display: inline-block;
	height: 33px;
	padding: 0 10px 0 34px;
	background: url(../../../assets/images/index.png) -225px -156px no-repeat;
}
.childNav .icon > h3 {
	font-weight: 400;
	float: left;
	cursor: pointer;
}
.classify {
	float: left;
	font-size: 12px;
	margin-top: 5px;
}
.classify li {
	float: left;
	margin-left: 15px;
	color: #666;
	border-left: 2px solid #ccc;
	padding-left: 15px;
	cursor: pointer;
}
.classify li:first-child {
	border-left: 0;
}
.more {
	float: right;
	margin-top: 5px;
	color: #555;
	padding-right: 30px;
	font-size: 12px;
	cursor: pointer;
}
.hot {
	width: 100%;
}
.hot ul {
	display: flex;
	justify-content: space-around;
	flex-wrap: wrap;
}
.hot ul li {
	position: relative;
	width: 21%;
	font-size: 12px;
	margin-bottom: 15px;
	word-break: break-all;
	text-overflow: ellipsis;
	overflow: hidden;
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
}
.hot ul li img {
	width: 95%;
	height: 80%;
}
.mask {
	position: absolute;
	bottom: 37px;
	left: 0;
	width: 95%;
	height: 27px;
	background-color: rgba(0, 0, 0, 0.5);
}
.count {
	color: #ccc;
	position: absolute;
	margin: 6px 4px 0px 26px;
}
.icon-play,
.icon-headset {
	float: left;
	width: 14px;
	height: 11px;
	margin: 9px 0px 10px 5px;
	background: url(../../../assets/images/iconall.png) no-repeat 0 -24px;
}
.icon-headset {
	float: right;
	width: 16px;
	height: 17px;
	background-position: 0 0;
	margin: 6px 10px 10px 5px;
}
.new_disc {
	border: 1px solid #ccc;
	background-color: #f5f5f5;
	padding: 20px;
	margin-bottom: 15px;
	overflow: hidden;
}
.new_disc ul {
	overflow: hidden;
	margin-left: 10px;
	padding-top: 15px;
}
.new_disc ul li {
	position: relative;
	float: left;
	width: 5%;
	margin-left: 90px;
}
.new_disc ul li:first-child {
	margin-left: 0;
}
.new_disc ul li .msk {
	display: inline-block;
	width: 118px;
	height: 100px;
	background: url('../../../assets/images/coverall.png') no-repeat 0 -570px;
}
.new_disc ul li span img {
	width: 100px;
	height: 100px;
}
.album,
.song {
	display: inline-block;
	width: 100%;
	font-size: 12px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
.song {
	color: #666;
}
.play {
	display: none;
	position: absolute;
	bottom: 50px;
	right: -65px;
	width: 20px;
	height: 20px;
	background: url(../../../assets/images/iconall.png) no-repeat 0 -110px;
	cursor: pointer;
}
.new_disc ul li:hover .play {
	display: block;
}
.list {
	display: flex;
	border: 1px solid #d3d3d3;
	border-left: 0;
	margin-bottom: 15px;
	background-color: #f4f4f4;
	font-size: 14px;
}
.soaring,
.newSong,
.original {
	flex: 1;
	border-left: 1px solid #d3d3d3;
}
.title {
	padding: 5px 0 10px 0;
}
.header {
	display: flex;
	margin-bottom: 20px;
	padding: 20px 0 0 19px;
}
.header img {
	width: 80px;
	height: 80px;
	box-shadow: 0px 5px 10px 2px rgba(0, 0, 0, 0.2);
}
.collect {
	margin-left: 15px;
}
.play-icon,
.like-icon {
	display: inline-block;
	width: 22px;
	height: 22px;
	background: url('../../../assets/images/index.png') no-repeat;
}
.play-icon {
	background-position: -267px -205px;
	margin-right: 15px;
}
.songList ul {
	overflow: hidden;
	font-size: 12px;
}
.songList ul li {
	width: 100%;
	padding: 5px 0 5px 15px;
	cursor: pointer;
}
.songList ul li:hover .icons {
	display: block;
}
.like-icon {
	background-position: -300px -205px;
}
.interleave {
	background-color: #e8e8e8;
}
.ranking {
	margin: 0 15px 0 5px;
}
.icons {
	display: none;
	float: right;
	width: 100px;
}
.play-song,
.like-song,
.add-song {
	display: inline-block;
	width: 17px;
	height: 17px;
	background: url('../../../assets/images/icon.png') no-repeat;
}
.play-song,
.like-song {
	background: url('../../../assets/images/index.png') no-repeat;
}
.play-song {
	background-position: -267px -268px;
	margin-left: 15px;
}
.add-song {
	background-position: 0 -700px;
	margin: -2px 5px;
}
.like-song {
	background-position: -297px -268px;
}
.examine {
	margin-left: 120px;
}
.loginBtn {
	width: 100%;
	height: 120px;
	box-sizing: border-box;
	font-size: 12px;
	color: #666;
	padding: 20px;
	background-image: linear-gradient(#fdfdfd, #e1e1e1);
}
.btn {
	margin: 20px 0 0 80px;
}
.singer,
.songerList,
.anchor {
	padding: 10px 15px;
}
.singer > p,
.anchor > p {
	display: flex;
	font-size: 12px;
	border-bottom: 1px solid #e1e1e1;
	justify-content: space-between;
}
.singer p span,
.anchor p span {
	margin-bottom: 10px;
	cursor: pointer;
}
.songerList li {
	display: flex;
	margin-bottom: 15px;
	background-color: #fafafa;
	border: 1px solid #eee;
	cursor: pointer;
}
.songerList li:hover {
	background-color: #f4f4f4;
}
.details {
	flex: 5;
	font-size: 12px;
	margin-left: 20px;
	color: #666;
}
.sing-pic {
	width: 62px;
}
.details h4 {
	margin: 10px 0;
}
.apply {
	margin-left: 45%;
	transform: translateX(-45%);
}
.anchor p span {
	font-weight: 600;
}
.hot {
	margin-top: 15px;
}
.hot li {
	display: flex;
	font-size: 12px;
	color: #666;
	margin-top: 10px;
}
.avatar-img {
	width: 40px;
}
.hotName {
	margin: 5px 0;
	color: #000;
}
.hotInfo {
	margin-left: 15px;
}
.new_disc {
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.daily {
	width: 150px;
}
.new_disc ul {
	display: flex;
	padding-top: 0;
}
.new_disc ul li {
	width: 150px;
	position: relative;
	margin-left: 30px;
	cursor: pointer;
}
.disc-img img {
	width: 140px;
	height: 140px;
}
.mask1 {
	width: 140px;
	height: 30px;
	font-size: 12px;
	background-color: rgba(0, 0, 0, 0.4);
	position: absolute;
	bottom: 50px;
}
.text,
.like-t {
	font-size: 14px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	padding: 5px 0;
}
.like-t {
	font-size: 10px;
	color: #999;
	padding: 0;
}
.daily {
	text-align: center;
	cursor: pointer;
}
.dec {
	font-size: 14px;
	margin: 5px 0;
}
.update {
	font-size: 10px;
	color: #999;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
</style>

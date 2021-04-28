<template>
	<!-- 我的音乐列表详情页面 -->
	<ul>
		<li v-for="item in artist" :key="item.id">
			<div class="main-d">
				<div class="img">
					<img :class="$route.path.indexOf('radio') !== -1 ? 'radio-img' : 'song-img'" :src="item.picUrl" alt="" />
				</div>
				<div class="referral">
					<p class="name">{{ item.name }}</p>
					<p class="by" v-if="$route.path.indexOf('radio') !== -1">by {{ item.dj.nickname }}</p>
					<p v-else>
						<span class="AL" v-if="item.albumSize">{{ item.albumSize }}个专辑</span>
						<span class="MV" v-if="item.mvSize">{{ item.mvSize }}个MV</span>
					</p>
				</div>
			</div>
			<div class="expect" v-if="$route.path.indexOf('radio') !== -1">
				<p class="by">{{ item.programCount }}期</p>
			</div>
		</li>
	</ul>
</template>

<script>
export default {
	props: {
		artist: {
			type: Array,
			require: true
		}
	}
}
</script>

<style scoped>
.song-img {
	width: 80px;
	height: 80px;
}
ul li {
	display: flex;
	align-items: center;
	margin: 10px 0;
	padding-bottom: 6px;
	border-bottom: 1px solid #ccc;
}
.main-d {
	display: flex;
	flex: 9;
}
.radio-img {
	width: 50px;
	height: 50px;
}
.referral {
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	margin-left: 20px;
}
.name {
	font-size: 14px;
}
.by {
	font-size: 12px;
	color: #999;
}
.expect {
	flex: 1;
}
.AL,
.MV {
	font-size: 12px;
	color: #999;
	margin-right: 15px;
}
</style>

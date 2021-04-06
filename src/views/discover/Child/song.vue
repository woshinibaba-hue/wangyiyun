<template>
  <div>
    <div class="warp">
      <div class="songlist-header">
        <div class="option-warp">
          <h2>{{ currentName }}</h2>
          <el-button @click="flag = !flag" size="small">选择分类<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <div class="options" v-if="flag">
            <div class="h-fg">
              <p :class="{ currentName: currentName == '全部' }" @click="toggle('全部')">全部</p>
            </div>
            <div class="details">
              <dl>
                <dt><i class="iconfont icon-diqiu"></i>语种</dt>
                <dd>
                  <ul>
                    <li :class="{ currentName: currentName == item.name }" @click="toggle(item.name)" v-for="item in this[0]" :key="item.index">{{ item.name }}</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-gangqin"></i>风格</dt>
                <dd>
                  <ul>
                    <li :class="{ currentName: currentName == item.name }" @click="toggle(item.name)" v-for="item in this[1]" :key="item.index">{{ item.name }}</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-Coffee"></i>场景</dt>
                <dd>
                  <ul>
                    <li :class="{ currentName: currentName == item.name }" @click="toggle(item.name)" v-for="item in this[2]" :key="item.index">{{ item.name }}</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-biaoqing"></i>情感</dt>
                <dd>
                  <ul>
                    <li :class="{ currentName: currentName == item.name }" @click="toggle(item.name)" v-for="item in this[3]" :key="item.index">{{ item.name }}</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-yinyue"></i>主题</dt>
                <dd>
                  <ul>
                    <li :class="{ currentName: currentName == item.name }" @click="toggle(item.name)" v-for="item in this[4]" :key="item.index">{{ item.name }}</li>
                  </ul>
                </dd>
              </dl>
            </div>
          </div>
        </div>
        <p class="how">热门</p>
      </div>
      <div class="song-list">
        <ul>
          <li v-for="item in songList" :key="item.id" @click="go(item.id)">
            <div class="song-img">
              <img :src="item.coverImgUrl" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> {{ item.playCount | playNum }}</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">{{ item.name }}</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">{{ item.creator.nickname }}</span>
              <img class="icon" :src="item.creator.avatarDetail && item.creator.avatarDetail.identityIconUrl" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <el-pagination background layout="prev, pager, next" :total="total" @current-change="handlePage"> </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      flag: false,
      0: [], // 语种分类
      1: [], // 风格分类
      2: [], // 场景分类
      3: [], // 情感分类
      4: [], // 主题分类
      all: {}, // 全部分类
      currentName: '全部', // 当前点击的分类名称
      songList: [], // 歌单
      total: 0, // 歌单数目
      page: 1 // 当前页码
    }
  },
  created() {
    this.getPlayList()
    this.getSongList()
  },
  methods: {
    //获取歌单分类列表数据
    async getPlayList() {
      const res = await this.$http.get('/playlist/catlist')
      this.all = res.all
      Object.getOwnPropertyNames(res.categories).forEach(item => {
        res.sub.forEach((i, index) => {
          if (i.category == item) {
            i.index = index + 1
            this[item].push(i)
          }
        })
      })
    },
    // 获取歌单数据
    async getSongList() {
      const res = await this.$http.get('/top/playlist', { params: { cat: this.currentName, limit: 15, offset: (this.page - 1) * 15 } })
      this.songList = res.playlists
      this.total = res.total
      this.flag = false
    },
    // 当页码数发送改变的时候触发
    handlePage(newPage) {
      this.page = newPage
      this.getSongList()
    },
    // 点击分类时触发
    toggle(val) {
      this.currentName = val
      this.getSongList()
    },
    go(id) {
      this.$router.push(`/songdetails?id=${id}`)
    }
  }
}
</script>

<style scoped>
.songlist-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 20px;
  border-bottom: 2px solid #ab0e0e;
}
.option-warp {
  display: flex;
}
.option-warp h2 {
  font-weight: 400;
  margin-right: 15px;
}
.options::before {
  position: absolute;
  top: -30px;
  left: 100px;
  content: '';
  width: 0;
  height: 0;
  border: 15px solid transparent;
  border-bottom-color: #fff;
}
.options {
  position: absolute;
  top: 195px;
  width: 600px;
  height: 430px;
  background-color: #fff;
  box-shadow: 0px 0px 20px -2px rgba(0, 0, 0, 0.5);
  z-index: 6;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 5px;
}
.h-fg {
  width: 100%;
  border-bottom: 1px solid #e6e6e6;
  padding-bottom: 15px;
}
.h-fg p {
  font-size: 12px;
  width: 70px;
  line-height: 30px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 3px;
  cursor: pointer;
}
.iconfont {
  vertical-align: middle;
  margin-right: 5px;
}
.details dl {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  cursor: pointer;
}
.details dl dt {
  width: 70px;
  text-align: center;
  border-right: 1px solid #e6e6e6;
  padding: 8px;
}
.details dl dd {
  flex: 7;
  padding: 8px;
}
.details dl dd ul li {
  float: left;
  margin: 5px 0;
  padding: 0 10px;
  border-right: 1px solid #ccc;
}
.el-pagination {
  margin-left: 55%;
  transform: translateX(-50%);
}
.how {
  width: 50px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #fff;
  background-image: linear-gradient(#ab0e0e, #921e1e);
  border-radius: 3px;
  font-size: 12px;
  border: 1px solid #dedddd;
}
.song-list ul {
  display: flex;
  flex-wrap: wrap;
}
.song-list ul li {
  width: 140px;
  margin: 15px;
  padding: 20px;
  cursor: pointer;
}
.song-list ul li:hover {
  border-radius: 5px;
  background-color: #eee;
}
.song-img {
  position: relative;
}
.song-img img {
  width: 140px;
  height: 140px;
}
.msk {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  position: absolute;
  bottom: 4px;
  left: 0;
  width: 140px;
  height: 30px;
  background-color: rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}
.erji,
.bof {
  font-size: 13px;
  color: #fff;
}
.bof {
  font-size: 18px;
}
.song-list ul li .introduce,
.list-name {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}
.introduce {
  font-size: 14px;
}
.s-fc4 {
  font-size: 8px;
  color: #999;
}
.list-name {
  display: inline-block;
  width: 90px;
  text-align: center;
  font-size: 10px;
  color: #666;
  margin: 0 3px;
}
.icon {
  width: 13px;
  vertical-align: middle;
}
.currentName {
  color: #ab0e0e;
}
</style>

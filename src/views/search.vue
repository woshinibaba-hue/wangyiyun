<template>
  <div>
    <div class="warp">
      <div class="search_btn">
        <input type="text" class="inp1" v-model="key" />
        <button class="iconfont icon-sousuo btn"></button>
      </div>
      <div class="main">
        <p class="keyword">
          搜索"<span>{{ key }}</span
          >", 找到<span class="red"> {{ count }} </span>个结果
        </p>
        <div class="search_result">
          <div class="search_nav">
            <ul>
              <li @click="toggle(1)" :class="{ current: type == 1 }">单曲</li>
              <li @click="toggle(100)" :class="{ current: type == 100 }">歌手</li>
              <li @click="toggle(10)" :class="{ current: type == 10 }">专辑</li>
              <li @click="toggle(1004)" :class="{ current: type == 1004 }">MV</li>
              <li @click="toggle(1006)" :class="{ current: type == 1006 }">歌词</li>
              <li @click="toggle(1000)" :class="{ current: type == 1000 }">歌单</li>
              <li @click="toggle(1018)" :class="{ current: type == 1018 }">声音主播</li>
              <li @click="toggle(1002)" :class="{ current: type == 1002 }">用户</li>
            </ul>
          </div>
          <div>
            <ul class="search_song" v-if="type == 1">
              <!-- class="geh"  隔行换色 -->
              <li v-for="item in resList" :key="item.id">
                <i class="iconfont icon-bofang"></i>
                <span class="song_name">{{ item.name }}</span>
                <span class="singer">{{ item.artists[0].name }}</span>
                <span class="album">《{{ item.album.name }}》</span>
                <span class="song_date">{{ item.duration | formatTime }}</span>
              </li>
            </ul>
            <ul class="singer_list" v-else-if="type == 100 || type == 10">
              <li v-for="item in resList" :key="item.id">
                <div>
                  <img :src="item.picUrl || item.img1v1Url" alt="" />
                </div>
                <p>{{ item.name }}</p>
              </li>
            </ul>
            <ul v-else-if="type == 1004" class="MV">
              <li v-for="item in resList" :key="item.id">
                <div>
                  <img :src="item.cover" alt="" class="mv-cover" />
                  <span class="iconfont icon-shipin shipin">&nbsp;{{ item.playCount | playNum }}万</span>
                  <span class="MV-SJ">{{ item.duration | formatTime }}</span>
                </div>
                <p class="mv-title">{{ item.name }}</p>
                <span class="mv-sing"
                  >{{ item.name }} / <i class="sing">{{ item.artistName }}</i></span
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
      <el-pagination background layout="prev, pager, next" :total="count" :page-size="size" @current-change="handleChange"> </el-pagination>
    </div>
    <Floor />
  </div>
</template>

<script>
import Floor from '../components/Floor'
export default {
  data() {
    return {
      key: '', // 搜索关键字
      size: 15,
      resList: [], // 搜索结果数据
      count: 0, // 搜索结果数量
      page: 1, // 页码
      type: 1 // 搜索类型
    }
  },
  components: {
    Floor
  },
  created() {
    this.key = this.$route.query.key
    this.getSongList()
  },
  methods: {
    // 获取搜索数据
    async getSongList(limit = this.size, keywords = this.key, type = this.type) {
      const { result } = await this.$http.get('/search', { params: { keywords, type, limit, offset: (this.page - 1) * limit } })
      console.log(result)
      if (this.type == 1) {
        this.resList = result.songs
        this.count = result.songCount
      } else if (this.type == 100) {
        this.resList = result.artists
        this.count = result.artistCount
      } else if (this.type == 10) {
        this.resList = result.albums
        this.count = result.albumCount
      } else if (this.type == 1004) {
        this.resList = result.mvs
        this.count = result.mvCount
      }
    },
    // 点击分页
    handleChange(newPage) {
      this.page = newPage
      this.getSongList()
    },
    toggle(i) {
      this.type = i
      this.getSongList()
    }
  }
}
</script>

<style scoped>
.search_btn {
  width: 353px;
  border: 1px solid #ccc;
  margin: 0 auto;
  box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
}
.inp1 {
  width: 300px;
  outline-style: none;
  padding: 8px;
  border: 0;
}
.btn {
  padding: 10px;
  border: 0;
  outline-style: none;
  border-left: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}
.main {
  max-width: 1200px;
  margin-top: 40px;
}
.keyword {
  font-size: 12px;
  color: #ccc;
}
.search_nav ul {
  margin-top: 15px;
  border: 1px solid #e3e3e3;
  border-top: 0;
  border-bottom: 0;
  background-color: #f7f7f7;
  overflow: hidden;
}
.search_nav ul li {
  float: left;
  width: 106px;
  line-height: 39px;
  padding: 0px 13.2px;
  border: 1px solid #e3e3e3;
  border-left: 0;
  border-right: 0;
  border-top-width: 2px;
  text-align: center;
  cursor: pointer;
}
.current {
  border-top-color: #d13030 !important;
  border-bottom: 0 !important;
  height: 40px;
  border-right: 1px solid #e3e3e3 !important;
  border-left: 1px solid #e3e3e3 !important;
  background-color: #fff;
}
.geh {
  background-color: #f7f7f7;
  border-radius: 5px;
}
.search_song,
.singer_list {
  margin-top: 20px;
  font-size: 12px;
}
li {
  border: 1px solid transparent;
}
.search_song li,
.singer_list li {
  width: 1043px;
  padding: 20px 10px;
  margin: 2px 0;
  cursor: pointer;
}
li:hover {
  background-color: #f7f7f7;
  border: 1px solid #eee;
  border-radius: 5px;
}
.song_name {
  display: inline-block;
  margin-left: 5px;
  width: 450px;
}
.singer {
  display: inline-block;
  width: 130px;
  color: #0c73c2;
}
.album {
  display: inline-block;
  margin: 0 100px;
  width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.el-pagination {
  text-align: center;
  margin-top: 10px;
}
.singer_list {
  display: flex;
  flex-wrap: wrap;
}
.singer_list li {
  text-align: center;
  width: 180px;
}
.singer_list li div img {
  width: 130px;
  height: 130px;
  border: 1px solid #e3e3e3;
}
.singer_list li p {
  margin-top: 10px;
}
.MV {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.MV li {
  position: relative;
  text-align: center;
  width: 185px;
  height: 130px;
  padding: 10px 0;
  cursor: pointer;
}
.shipin {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 12px;
  color: #fff;
  text-align: center;
  padding: 0 8px;
  border-radius: 2px;
  background-color: rgba(0, 0, 0, 0.5);
}
.MV-SJ {
  position: absolute;
  bottom: 50px;
  left: 10px;
  font-size: 12px;
  color: #fff;
  padding: 0 8px;
  background-color: rgba(0, 0, 0, 0.5);
}
.mv-cover {
  width: 90%;
}
.mv-title {
  font-size: 14px;
  font-weight: 600;
}
.mv-sing {
  font-size: 10px;
}
.sing {
  color: #0c73c2;
}
</style>

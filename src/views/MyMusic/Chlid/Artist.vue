<template>
  <div class="box">
    <MyHeader>
      <template v-slot:title>
        <h2 class="head">我的歌手 ({{ count }})</h2>
      </template>
    </MyHeader>
    <MyList :artist="artist" />
    <el-pagination background layout="prev, pager, next" :total="count" @current-change="handlePage" :page-size="10"> </el-pagination>
  </div>
</template>

<script>
import MyHeader from '../../../components/MyHeader'
import MyList from '../../../components/MyList'
export default {
  data() {
    return {
      count: 0, // 收藏歌手个数
      artist: [], // 歌手
      page: 1 // 当前页码
    }
  },
  components: {
    MyHeader,
    MyList
  },
  created() {
    this.getArtist()
  },
  methods: {
    // 获取歌手列表
    async getArtist() {
      let res = await this.$http.get('/artist/sublist', { params: { limit: 10, offset: (this.page - 1) * 10 } })
      console.log(res)
      if (res.count) {
        this.count = res.count
      }
      this.artist = res.data
    },
    // 页码发生改变是触发
    handlePage(newPage) {
      this.page = newPage
      this.getArtist()
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
.el-pagination {
  margin: 20px 0;
  margin-left: 55%;
  transform: translateX(-50%);
}
</style>

<template>
  <div class="box">
    <MyHeader>
      <template v-slot:title>
        <h2 class="head">我订阅的电台（9）</h2>
      </template>
    </MyHeader>
    <MyList :artist="radioList"></MyList>
  </div>
</template>

<script>
import MyHeader from '../../../components/MyHeader'
import MyList from '../../../components/MyList'
export default {
  data() {
    return {
      count: '', // 订阅的电台数量
      radioList: [] // 订阅的电台详情
    }
  },
  components: {
    MyHeader,
    MyList
  },
  created() {
    this.getRadio()
  },
  methods: {
    async getRadio() {
      let res = await this.$http.get('/dj/sublist')
      console.log(res)
      this.count = res.count
      this.radioList = res.djRadios
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
</style>

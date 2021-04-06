<template>
  <div class="mask2">
    <p class="head">星期{{ day }}</p>
    <p class="db">{{ date }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      day: '', // 星期
      date: '' // 日期
    }
  },
  created() {
    this.getDate()
  },
  methods: {
    // 获取日期
    getDate() {
      let date = new Date()
      let arr = ['天', '一', '二', '三', '四', '五', '六']
      this.day = arr[date.getDay()]
      this.date = date.getDate()
    }
  }
}
</script>

<style scoped>
.mask2 {
  position: relative;
  width: 140px;
  height: 140px;
  background: url('../../assets/images/date.png') no-repeat 0 0;
}
.mask2::before {
  position: absolute;
  top: 33px;
  left: 0;
  width: 140px;
  height: 107px;
  content: '';
  background: url('../../assets/images/date_mask.png') no-repeat;
}
.mask2 .head {
  height: 33px;
  line-height: 33px;
  color: #fed9d9;
  font-size: 14px;
  text-shadow: 0 -1px #962626;
  text-align: center;
}
.mask2 .db {
  line-height: 102px;
  text-align: center;
  font-size: 94px;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: #202020;
}
</style>

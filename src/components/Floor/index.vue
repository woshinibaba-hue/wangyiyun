<template>
  <!-- 底部 -->
  <div class="floor">
    <div class="main">
      <div class="left">
        <p class="link">
          <span>服务条款</span>
          <span>隐私政策</span>
          <span>儿童隐私政策</span>
          <span>版权投诉指引</span>
          <span>意见反馈</span>
        </p>
        <p class="copyright">
          <span class="">网易公司版权所有©1997-2021</span>
          <span>杭州乐读科技有限公司运营：浙网文[2018]3506-263号</span>
        </p>
        <p class="report">
          <span>违法和不良信息举报电话：0571-89853516</span>
          <span>举报邮箱：ncm5990@163.com</span>
        </p>
        <p class="records">
          <span>粤B2-20090191-18&nbsp;&nbsp;&nbsp;工业和信息化部备案管理系统网站</span>
          <span class="police-logo"></span>
          <span>浙公网安备 33010902002564号</span>
        </p>
      </div>
      <div class="right">456</div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.floor {
  margin: -1px auto;
  border-top: 1px solid #ccc;
}
.main {
  display: flex;
  width: 70%;
  margin: 20px auto;
}
.left {
  flex: 1;
  font-size: 12px;
  padding: 0 10px;
}
.left p {
  line-height: 25px;
}
.link span {
  padding: 0 10px;
  color: #999;
  border-left: 1px solid #999;
}
.link span:first-child {
  border-left: 0;
  padding-left: 0;
}
.copyright span,
.report span,
.records span {
  padding-right: 15px;
  color: #666;
}
.police-logo {
  display: inline-block;
  width: 14px;
  height: 14px;
  padding-right: 2px !important;
  background: url('../../assets/images/police.png') no-repeat;
  background-size: 14px;
  vertical-align: middle;
}
.right {
  flex: 1;
}
</style>

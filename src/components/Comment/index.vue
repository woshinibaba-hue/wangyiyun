<template>
  <!-- 评论 -->
  <div class="wrap">
    <div class="box" v-if="UserInfo.isLogin">
      <div>
        <div class="comment-header">
          <h2 class="text">评论</h2>
          <span class="comment-count">共{{ comment.total }}条评论</span>
        </div>
        <div class="comment-warp">
          <div class="hearImg">
            <img :src="UserInfo && UserInfo.profile.avatarUrl" alt="" />
          </div>
          <i class="jt"></i>
          <i class="jt1"></i>
          <textarea name="" id="" cols="30" rows="10" placeholder="评论" v-model="textarea"></textarea>
        </div>
        <div class="comment-btn" @click="issue">
          <button>评论</button>
        </div>
      </div>
      <div class="comment-list">
        <h2>最新评论(1)</h2>
        <ul>
          <li v-for="item in comment.comments" :key="item.commentId">
            <div>
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="comment-detail">
              <p>
                <span class="name">{{ item.user.nickname }}</span> : {{ item.content }}
              </p>
              <div class="reply" v-if="item.beReplied.length">
                <ul>
                  <li v-for="i in item.beReplied" :key="i.beRepliedCommentId">
                    <span class="reply-name name">{{ i.user.nickname }} :</span>
                    <span class="reply-text">{{ i.content }}</span>
                  </li>
                </ul>
              </div>
              <div class="comment-d">
                <p class="comment-date">{{ item.time | formatDate }}</p>
                <p class="p-d">
                  <!-- <span>删除</span> -->
                  <span class="iconfont icon-dianzan dianzan" @click="commentLike(item.commentId)" :class="{ dianzan1: item.liked }"
                    ><i v-if="item.likedCount">({{ item.likedCount }})</i></span
                  >
                  <span>回复</span>
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <el-pagination background layout="prev, pager, next" :total="comment.total" @current-change="handlePage"> </el-pagination>
    </div>
    <div v-else>
      <h3>请登录后再评论</h3>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: ['id'],
  data() {
    return {
      comment: {}, // 评论详情
      page: 1, // 当前页码
      textarea: '' // 评论内容
    }
  },
  computed: {
    ...mapState(['UserInfo', 'threadId'])
  },
  created() {
    this.getComment()
  },
  methods: {
    // 获取评论
    async getComment() {
      let res = await this.$http.get('/comment/playlist', { params: { id: this.id, limit: 15, offset: (this.page - 1) * 15 } })
      console.log(res)
      this.comment = res
    },
    // 当页码发生改变时触发
    handlePage(newPage) {
      this.page = newPage
      this.getComment()
    },
    // 评论点赞
    async commentLike(id) {
      let c = this.comment.comments.filter(item => item.commentId == id)
      let res = await this.$http.get('/comment/like', {
        params: {
          id: this.id,
          type: 2,
          cid: id,
          t: c[0].liked ? 0 : 1
        }
      })
      console.log(res)
      this.getComment()
    },
    // 发生评论
    async issue() {
      let res = await this.$http.get('/comment', {
        params: {
          type: 2,
          t: 1,
          content: this.textarea,
          id: this.id
        }
      })
      console.log(res)
      this.textarea = ''
      this.getComment()
    }
  }
}
</script>

<style scoped>
.box {
  width: 780px;
  padding: 20px;
}
.comment-header {
  padding-bottom: 10px;
  display: flex;
  align-items: flex-end;
  border-bottom: 2px solid #c20c0c;
}
.comment-header .text {
  font-size: 20px;
  font-weight: 400;
}
.comment-count {
  font-size: 12px;
  color: #999;
  margin-left: 20px;
}
.comment-warp {
  position: relative;
  display: flex;
  margin-top: 15px;
}
.hearImg img,
.comment-list ul li img {
  width: 50px;
  height: 50px;
  margin-right: 15px;
}
textarea {
  width: 700px;
  height: 60px;
  padding: 8px;
  font-size: 10px;
  resize: none;
  box-sizing: border-box;
  outline: none;
  border-color: #ccc;
}
.jt,
.jt1 {
  position: absolute;
  top: 10px;
  left: 51px;
  width: 0;
  height: 0;
  border: 7px solid transparent;
  border-right-color: #ccc;
}
.jt1 {
  left: 52px;
  border-right-color: #fff;
}
.comment-btn {
  float: right;
  margin: 5px 30px 0 0;
}
.comment-btn button {
  font-size: 10px;
  padding: 3px 8px;
}
.comment-list {
  margin-top: 30px;
}
.comment-list h2 {
  font-size: 12px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.comment-list ul {
  margin-top: 10px;
}
.name {
  color: #0c73c2;
}
.comment-list ul li {
  display: flex;
  font-size: 12px;
  margin: 8px 0;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}
.comment-detail {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.comment-d {
  width: 700px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.comment-date {
  color: #999;
}
.reply ul li {
  padding: 10px 15px;
  background-color: #f4f4f4;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.dianzan {
  color: #999;
}
.dianzan1 {
  color: #c20c0c;
}
.p-d > span {
  margin: 0 5px;
  cursor: pointer;
}
.el-pagination {
  margin-top: 20px;
  margin-left: 50%;
  transform: translateX(-50%);
}
</style>

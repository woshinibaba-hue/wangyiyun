<template>
  <div>
    <div class="warp">
      <div class="songlist-header">
        <div class="option-warp">
          <h2>全部</h2>
          <el-button @click="flag = !flag" size="small">选择分类<i class="el-icon-arrow-down el-icon--right"></i></el-button>
          <div class="options" v-if="flag">
            <div class="h-fg">
              <p>全部风格</p>
            </div>
            <div class="details">
              <dl>
                <dt><i class="iconfont icon-diqiu"></i>语种</dt>
                <dd>
                  <ul>
                    <li>华语</li>
                    <li>欧美</li>
                    <li>日语</li>
                    <li>韩语</li>
                    <li>俄语</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-gangqin"></i>风格</dt>
                <dd>
                  <ul>
                    <li>流行</li>
                    <li>摇滚</li>
                    <li>电子</li>
                    <li>舞曲</li>
                    <li>说唱</li>
                    <li>轻音乐</li>
                    <li>爵士</li>
                    <li>乡村</li>
                    <li>R&B/Soul</li>
                    <li>古典</li>
                    <li>民族</li>
                    <li>英伦</li>
                    <li>金属</li>
                    <li>朋克</li>
                    <li>蓝调</li>
                    <li>雷鬼</li>
                    <li>世界音乐</li>
                    <li>拉丁</li>
                    <li>New Age</li>
                    <li>古风</li>
                    <li>后摇</li>
                    <li>Bossa Nova</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-Coffee"></i>场景</dt>
                <dd>
                  <ul>
                    <li>清晨</li>
                    <li>夜晚</li>
                    <li>学习</li>
                    <li>工作</li>
                    <li>午休</li>
                    <li>下午茶</li>
                    <li>地铁</li>
                    <li>驾车</li>
                    <li>运动</li>
                    <li>旅行</li>
                    <li>散步</li>
                    <li>酒吧</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-biaoqing"></i>情感</dt>
                <dd>
                  <ul>
                    <li>怀旧</li>
                    <li>清新</li>
                    <li>浪漫</li>
                    <li>伤感</li>
                    <li>治愈</li>
                    <li>放松</li>
                    <li>孤独</li>
                    <li>感动</li>
                    <li>兴奋</li>
                    <li>快乐</li>
                    <li>安静</li>
                    <li>思恋</li>
                  </ul>
                </dd>
              </dl>
              <dl>
                <dt><i class="iconfont icon-yinyue"></i>主题</dt>
                <dd>
                  <ul>
                    <li>综艺</li>
                    <li>影视原声</li>
                    <li>ACG</li>
                    <li>儿童</li>
                    <li>校园</li>
                    <li>游戏</li>
                    <li>70后</li>
                    <li>80后</li>
                    <li>90后</li>
                    <li>网络歌曲</li>
                    <li>KTV</li>
                    <li>金典</li>
                    <li>翻唱</li>
                    <li>吉他</li>
                    <li>钢琴</li>
                    <li>器乐</li>
                    <li>榜单</li>
                    <li>00后</li>
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
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
          <li>
            <div class="song-img">
              <img src="http://p3.music.126.net/uQ6HytnGhIsYrWo_buQe6g==/109951165845348997.jpg?param=140y140" alt="" />
              <div class="msk">
                <i class="iconfont icon-erji erji"> 999 万</i>
                <i class="iconfont icon-bofang bof"></i>
              </div>
            </div>
            <p class="introduce">呵呵呵呵或金合欢花或或哈哈哈</p>
            <div>
              <span class="s-fc4">by</span>
              <span class="list-name">云音乐官方歌单</span>
              <img class="icon" src="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4788940880/1a1f/68f5/b59a/b444b81b88567108ba88194fa29144f5.png" alt="" />
            </div>
          </li>
        </ul>
      </div>
      <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
    </div>
    <Floor></Floor>
  </div>
</template>

<script>
import Floor from '../../../components/Floor'
export default {
  data() {
    return {
      flag: false
    }
  },
  components: {
    Floor
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
.song-list ul li .introduce {
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
  font-size: 10px;
  color: #666;
  margin: 0 3px;
}
.icon {
  width: 13px;
  vertical-align: middle;
}
</style>

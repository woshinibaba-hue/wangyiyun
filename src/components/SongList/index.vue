<template>
  <!-- 歌曲列表 -->
  <div class="song_list">
    <table>
      <thead>
        <tr>
          <td></td>
          <td>歌曲标题</td>
          <td>时长</td>
          <td>歌手</td>
          <td>专辑</td>
        </tr>
      </thead>
      <tbody>
        <tr @click="playMusic(item.id)" :class="{ geh: index % 2 == 0 }" v-for="(item, index) in playList" :key="item.id">
          <td class="ranking">{{ index + 1 }}</td>
          <td>
            <div class="song">
              <span class="song-name">{{ item.name }}</span>
            </div>
          </td>
          <td class="song-date" v-if="item.dt">
            {{ item.dt | formatTime }}
          </td>
          <td class="song-date" v-else>
            {{ item.duration | formatTime }}
          </td>
          <td class="sing-name" v-if="item.ar">
            {{ item.ar[0].name }}
          </td>
          <td class="sing-name" v-else>
            {{ item.artists[0].name }}
          </td>
          <td class="sing-name1" v-if="item.al">
            {{ item.al.name }}
          </td>
          <td class="sing-name1" v-else>
            {{ item.album.name }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    playList: {
      type: Array,
      require: true
    }
  },
  methods: {
    // 点击音乐时触发
    playMusic(id) {
      this.$store.dispatch('getMusic', id)
      this.$store.commit('SetMusicList', this.playList)
    }
  }
}
</script>

<style scoped>
.song_list {
  max-width: 790px;
  border: 1px solid #c4c4c4;
  border-top: 2px solid #c10d0c;
}
table {
  border-collapse: collapse;
  font-size: 12px;
  color: #999;
  cursor: pointer;
}
thead tr td {
  border: 1px solid #c4c4c4;
  border-right: 0;
  border-top: 0;
  padding: 10px 16px;
  background-image: linear-gradient(#ffffff, #f0f0f0);
}
tbody tr {
  width: 100%;
}
tbody tr td {
  width: 100px;
  padding: 8px 15px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
thead tr td:first-child {
  border-left: 0;
}
.ranking {
  width: 100px;
}
.song {
  width: 300px;
  display: flex;
  align-items: center;
}
.song-date {
  width: 45px;
}
.song-wrap {
  margin-bottom: 60px;
}
.sing-name {
  width: 100px;
}
.sing-name1 {
  display: inline-block;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.geh {
  background-color: #f7f7f7;
}
</style>

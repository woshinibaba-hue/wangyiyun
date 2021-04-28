<template>
  <div class="box">
    <Header :showLogin="showLogin" @show="show" />
    <Login v-if="showLogin" @show="show" />
    <router-view />
    <Play v-if="musicId" />
    <Floor></Floor>
  </div>
</template>

<script>
import Header from './components/Header'
import Login from './components/Login'
import Play from './components/Play'
import Floor from './components/Floor'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showLogin: false
      // i: 0
    }
  },
  components: {
    Header,
    Login,
    Play,
    Floor
  },
  computed: {
    ...mapState(['musicId'])
  },
  methods: {
    show(isShow) {
      this.showLogin = isShow
    }
  }
}
</script>

<style></style>

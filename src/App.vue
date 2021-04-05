<template>
  <div class="box">
    <Header :showLogin="showLogin" @show="show" />
    <Login v-if="showLogin" @show="show" />
    <router-view />
    <Play v-if="musicId" />
  </div>
</template>

<script>
import Header from './components/Header'
import Login from './components/Login'
import Play from './components/Play'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      showLogin: false
    }
  },
  components: {
    Header,
    Login,
    Play
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

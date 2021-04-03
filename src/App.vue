<template>
  <div class="box">
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from './components/Header'
export default {
  components: {
    Header
  }
}
</script>

<style>
@import url(./assets/css/base.css);
</style>

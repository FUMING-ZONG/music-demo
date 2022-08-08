<template>
  <div id='app'>
    <router-view></router-view>
    <FooterMusic v-show="$store.state.isFooterShow"></FooterMusic>
  </div>
</template>

<script>
import FooterMusic from '@/components/item/FooterMusic.vue'
export default {
  name: 'App',
  components: {
    FooterMusic
  }
}
</script>

<style lang='less' scoped>
/deep/ * {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
/deep/ a {
  color: black;
}
</style>
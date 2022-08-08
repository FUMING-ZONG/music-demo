<template>
  <div>
    <TopNav></TopNav>
    <SwiperTop></SwiperTop>
    <IconList></IconList>
    <MusicList></MusicList>
    <TopArtists></TopArtists>
  </div>
</template>

<script>
import TopNav from '@/components/home/TopNav.vue'
import SwiperTop from '@/components/home/SwiperTop.vue'
import IconList from '@/components/home/IconList.vue'
import MusicList from '@/components/home/MusicList.vue'
import TopArtists from '@/components/home/TopArtists.vue'
export default {
  components: {
    TopNav,
    SwiperTop,
    IconList,
    MusicList,
    TopArtists
  }
}
</script>

<style lang='less' scoped>
</style>
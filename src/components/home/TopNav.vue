
<template>
  <div class="topNav">
    <div class="topLeft">
      <van-icon name="wap-nav" size=0.64rem @click="this.isSidebarShow=!isSidebarShow" />
    </div>
    <div class="topContent">
      <span :class="{active:this.index===1}" @click="$router.push('/infoUser')">我的</span>
      <span :class="{active:this.index===2}" @click="$router.push('/')">发现</span>
      <span :class="{active:this.index===3}">云村</span>
      <span :class="{active:this.index===4}">视频</span>
    </div>
    <div class="topRight">
      <van-icon name="search" size=0.64rem @click="$router.push('/search')" />
    </div>
    <van-popup v-model:show="isSidebarShow" position='left' :style="{ height: '100%',width:'80%' }">
      <Sidebar></Sidebar>
    </van-popup>
  </div>
</template>

<script>
import Sidebar from '@/components/home/Sidebar.vue'
export default {
  data() {
    return {
      isSidebarShow: false,
      index: 2
    }
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      let path = this.$route.path
      if (path === '/infoUser') {
        this.index = 1
      } else if (path === '/') {
        this.index = 2
      }
    }
  },
  name: 'TopNav',
  components: {
    Sidebar
  }
}
</script>

<style lang='less' scoped>
.topNav {
  width: 100%;
  height: 0.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .topLeft {
    margin: 0 0 0 10px;
  }
  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;
    .active {
      font-weight: 900;
    }
  }
  .topRight {
    margin: 0 10px 0 0;
  }
}
</style>
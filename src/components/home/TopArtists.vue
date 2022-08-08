<template>
  <div class="topArtists">
    <div class="listTop">
      <div class="title">热门歌手</div>
      <div class="more">查看更多</div>
    </div>
    <div class="listContent">
      <van-swipe :loop="false" :width="140" :show-indicators='false' class="my-swipe">
        <van-swipe-item v-for="item in this.topArtists" :key="item" class="item">
          <!-- 给每个元素加上路由连接 -->
          <router-link :to="{path:'Search',query:{name:item.name}}">
            <div>
              <!-- 图片 -->
              <img :src="item.picUrl" alt="">
              <!-- 歌手名 -->
              <span class="name">{{item.name}}</span>
            </div>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getTopArtists } from '@/request/api/home.js'
export default {
  data() {
    return {
      topArtists: []
    }
  },
  created() {
    this.get()
  },
  methods: {
    async get() {
      let res = await getTopArtists()
      this.topArtists = res.data.artists
    }
  }
}
</script>

<style lang='less' scoped>
.topArtists {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  margin-bottom: 1.5rem;
  .listTop {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      padding: 0.1rem;
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.4rem;
      margin: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .listContent {
    width: 100%;
    height: 3rem;
    .item {
      padding: 0 0.1rem;
      div {
        display: flex;
        flex-direction: column;
        align-items: center;
        img {
          width: 100%;
          height: 2rem;
          border-radius: 0.2rem;
        }
        .name {
          font-size: 0.36rem;
        }
      }
    }
  }
}
</style>
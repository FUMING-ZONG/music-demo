<template>
  <!-- 顶部标题部分 -->
  <div class="musicList">
    <div class="musicTop">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <!-- 主体部分 -->
    <div class="musicContent">
      <!-- 使用vant的swipe轮播滑块 -->
      <van-swipe :loop="false" :width="140" :show-indicators='false' class="my-swipe">
        <van-swipe-item v-for="item in state.musicList" :key="item" class="item">
          <!-- 给每个元素加上路由连接 -->
          <router-link :to="{path:'itemMusic',query:{id:item.id}}">
            <!-- 图片 -->
            <img :src="item.picUrl" alt="">
            <!-- 播放量 -->
            <span class="playCount">
              <van-icon name="play" size=0.36rem />
              {{methods.formatPlayValue(item.playCount)}}
            </span>
            <!-- 歌单标题 -->
            <span class="name">{{item.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from '@/request/api/home.js'
import { reactive, onMounted } from 'vue'
export default {
  //获取数据
  setup() {
    const state = reactive({
      musicList: []
    })
    // 定义一个格式化播放量方法
    const methods = {
      formatPlayValue(num) {
        if (num >= 100000000) {
          return (num / 100000000).toFixed(1) + '亿'
        } else if (num >= 10000) {
          return (num / 10000).toFixed(1) + '万'
        }
      }
    }
    onMounted(async () => {
      let res = await getMusicList()
      state.musicList = res.data.result
    })
    return {
      state,
      methods
    }
  }
}
</script>

<style lang='less' scoped>
.musicList {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .musicTop {
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
  .musicContent {
    width: 100%;
    height: 4rem;
    .my-swipe {
      position: relative;
      height: 100%;
      .item {
        padding: 0 0.1rem;
        img {
          width: 100%;
          height: 3rem;
          border-radius: 0.2rem;
        }
        .playCount {
          position: absolute;
          top: 0.05rem;
          right: 0.2rem;
          font-size: 0.24rem;
          color: #ccc;
        }
        .name {
          font-size: 0.24rem;
        }
      }
    }
  }
}
</style>
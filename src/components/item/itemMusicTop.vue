<template>
  <div class="itemMusicTop">
    <div class="nav">
      <!-- 顶部导航 -->
      <!-- 背景图片 -->
      <img :src="playlist.coverImgUrl" alt="" class="bgimg">
      <div class="itemLeft">
        <van-icon name="arrow-left" size=0.64rem @click="$router.go(-1)" />
        <span>歌单</span>
      </div>
      <div class="itemRight">
        <van-icon name="search" size=0.64rem />
        <van-icon name="wap-nav" size=0.64rem />
      </div>
    </div>
    <!-- 歌单信息 -->
    <div class="details">
      <div class="img"><img :src="playlist.coverImgUrl" alt=""></div>
      <div class="info">
        <div class="title">{{playlist.name}}</div>
        <div class="user">
          <img :src='user.userimgurl' alt="">
          <span>{{user.nickname}}</span>
          <van-icon name="arrow" size=0.3rem />
        </div>
        <div class="introd">
          <div class="introdlfte">{{playlist.description}}</div>
          <div class="introdright">
            <van-icon name="arrow" />
          </div>
        </div>
      </div>
    </div>
    <!-- 歌单操作 -->
    <div class="icon">
      <div class="item">
        <van-icon name="chat-o" size=0.6rem />
        <span>{{state.dynamic.commentCount}}</span>
      </div>
      <div class="item">
        <van-icon name="share-o" size=0.6rem />
        <span>{{state.dynamic.shareCount}}</span>
      </div>
      <div class="item">
        <van-icon name="down" size=0.6rem />
        <span>下载</span>
      </div>
      <div class="item">
        <van-icon name="certificate" size=0.6rem />
        <span>多选</span>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getCount } from '@/request/api/item.js'
export default {
  props: ['playlist', 'user'],
  setup() {
    const state = reactive({
      dynamic: {}
    })
    onMounted(async () => {
      let id = useRoute().query.id
      let res = await getCount(id)
      state.dynamic = res.data
    })
    return { state }
  }
}
</script>

<style lang='less' scoped>
.itemMusicTop {
  .nav {
    position: relative;
    width: 100%;
    height: 1rem;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    .itemLeft,
    .itemRight {
      width: 25%;
      height: 100%;
      display: flex;
      align-items: center;
      margin: 0 0.2rem;
      justify-content: space-between;
      color: #fff;
      span {
        font-size: 0.44rem;
      }
    }
    .bgimg {
      position: fixed;
      width: 100%;
      height: 11rem;
      z-index: -1;
      filter: blur(30px);
    }
  }
  .details {
    width: 100%;
    height: 3.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .img img {
      width: 3rem;
      height: 3rem;
      margin: 0.2rem;
      border-radius: 0.4rem;
    }
    .info {
      width: 6rem;
      height: 3rem;
      margin: 0.2rem;
      .tetle,
      .introd {
        width: 100%;
        height: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .title {
        width: 100%;
        height: 1rem;
        color: #fff;
        font-size: 0.36rem;
        margin: 0.02rem;
      }
      .user {
        width: 100%;
        height: 1rem;
        margin: 0.02rem;
        display: flex;
        align-items: center;
        color: #ccc;
        img {
          width: 0.8rem;
          height: 0.8rem;
          border-radius: 0.4rem;
        }
        span {
          padding: 0 0.2rem;
        }
      }
      .introd {
        color: #ccc;
        font-size: 0.16rem;
        margin: 0.02rem;
        display: flex;
        .introdlfte {
          width: 95%;
          height: 100%;
        }
        .introdright {
          width: 5%;
          height: 100%;
          line-height: 1rem;
        }
      }
    }
  }
  .icon {
    width: 100%;
    height: 1rem;
    margin-top: 0.2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .item {
      width: 45%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
    }
  }
}
</style>
<template>
  <div class="itemMusicList">
    <!-- 顶部 -->
    <div class="nav">
      <div class="navlfet">
        <van-icon name="play-circle-o" size=0.5rem />
        <span class="text1">播放全部</span><span class="text2">(共{{itemlist.length}}首)</span>
      </div>
      <div class="navright"><span>+&nbsp;收藏({{subscribedCount}})</span></div>
    </div>
    <!-- 歌曲列表 -->
    <div class="itemlist">
      <!-- 循环渲染每个元素 -->
      <div class="item" v-for="(item,i) in itemlist" :key="i">
        <div class="itemlfte" @click="playMusic(i)">
          <!-- 循环左边数字 -->
          <div class="lftenum">{{i+1}}</div>
          <!-- 歌曲信息 -->
          <div class="info">
            <p>{{item.name}}</p>
            <!-- 当歌手不止一个时循环渲染每个人名 -->
            <span v-for="(item2,index) in item.ar" :key="index">{{item2.name+'&nbsp;'}}</span>
          </div>
        </div>
        <!-- 右边元素 -->
        <div class="itemright">
          <!-- 根据这首曲子是否有mv，判断是否渲染mv图标 -->
          <span>
            <van-icon name="live" v-if="item.mv!=0" size=0.5rem />
          </span>
          <van-icon name="wap-nav" size=0.5rem />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  props: ['itemlist', 'subscribedCount'],
  setup(props) {},
  methods: {
    playMusic(i) {
      this.updatePlayList(this.itemlist)
      this.updateplayListIndex(i)
    },
    ...mapMutations(['updatePlayList', 'updateplayListIndex'])
  }
}
</script>

<style lang='less' scoped>
.itemMusicList {
  width: 100%;
  margin-top: 0.5rem;
  padding-bottom: 1.5rem;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;
  .nav {
    width: 100%;
    height: 1rem;
    padding: 0.1rem 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .navlfet {
      .text1 {
        font-size: 0.36rem;
        font-weight: 900;
        padding: 0 0 0 0.2rem;
      }
      .text2 {
        color: #ccc;
      }
    }
    .navright {
      width: 35%;
      height: 100%;
      border-radius: 0.5rem;
      background-color: red;
      line-height: 0.75rem;
      span {
        padding: 0.2rem;
        color: #fff;
      }
    }
  }
  .itemlist {
    width: 100%;
    padding: 0 0.2rem;
    .item {
      width: 100%;
      height: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .itemlfte {
        width: 80%;
        height: 100%;
        display: flex;
        .lftenum {
          line-height: 1rem;
        }
        .info {
          width: 90%;
          margin-top: 0.25rem;
          margin-left: 0.2rem;
          p {
            font-size: 0.32rem;
            font-weight: 700;
          }
          span {
            font-size: 0.16rem;
            color: #ccc;
          }
        }
      }
      .itemright {
        color: #ccc;
        span {
          margin-right: 0.2rem;
        }
      }
    }
  }
}
</style>
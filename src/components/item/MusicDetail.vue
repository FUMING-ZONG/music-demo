<template>
  <div class="musicDetail">
    <!-- 背景图片 -->
    <img :src="musicList.al.picUrl" alt="" class="bgimg">
    <!-- 顶部 -->
    <div class="detailTop">
      <div class="detailTopLeft">
        <van-icon name="arrow-left" size=0.64rem @click="backHome" />
        <div class="info">
          <Vue3Marquee>{{musicList.al.name}}</Vue3Marquee>
          <span v-for='item in musicList.ar' :key='item'>
            {{item.name+'&nbsp;'}}
          </span>
          <van-icon name="arrow" size=0.16rem color=#999 />
        </div>
      </div>
      <div class="detailTopRight">
        <van-icon name="share-o" size=0.64rem />
      </div>
    </div>
    <!-- 中间指针和磁盘 -->
    <div class="detailContent" v-show="!isLyricShow" @click="isLyricShow=true">
      <img src="@/assets/needle-ab.png" alt="" class="img_needle" :class="{img_needle_active:!isbtnShow}">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="musicList.al.picUrl" alt="" class="img_ar" :class="{img_ar_active:!isbtnShow,img_ar_pauesd:isbtnShow}">
    </div>
    <!-- 歌词 -->
    <div class="musicLyric" ref="musicLyric" v-show="isLyricShow" @click="isLyricShow=false">
      <p v-for="item in lyric" :key='item' :class="{active:(currentTime*1000>=item.time&&currentTime*1000<item.nextTime)}">
        {{item.lrc}}
      </p>
    </div>
    <!-- 底部 -->
    <div class="detailFooter">
      <!-- 底部图标 -->
      <div class="footerTop">
        <van-icon name="like-o" size=0.64rem />
        <van-icon name="down" size=0.64rem />
        <van-icon name="more-o" size=0.64rem />
        <van-icon name="chat-o" size=0.64rem />
        <van-icon name="exchange" size=0.64rem />
      </div>
      <!-- 底部进度条 -->
      <div class="footerContent">
        <input type="range" class="range" min='0' :max='duration' v-model="currentTime" step="0.05">
      </div>
      <!-- 底部歌曲控件 -->
      <div class="footer">
        <van-icon name="arrow-left" size=0.64rem @click="goPlay(-1)" />
        <van-icon name="play-circle-o" size=1rem v-if="isbtnShow" @click="play" />
        <van-icon name="pause-circle-o" size=1rem v-else @click="play" />
        <van-icon name="arrow" size=0.64rem @click="goPlay(1)" />
      </div>
    </div>
  </div>
</template>

<script>
//导入marquee跑马灯组件
import { Vue3Marquee } from 'vue3-marquee'
import 'vue3-marquee/dist/style.css'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      isLyricShow: false,
      progress: 0
    }
  },
  computed: {
    ...mapState(['lyricList', 'currentTime', 'playList', 'playListIndex', 'duration']),
    lyric() {
      //对获取的歌词进行格式化，获得每行歌词与对应的时间
      let arr
      if (this.lyricList.lyric) {
        arr = this.lyricList.lyric.split(/[(\r\n)\r\n]+/).map((item, i) => {
          let min, //分钟
            sec, //秒
            mill, //毫秒
            lrc = '' //每行的歌词
          min = item.slice(1, 3)
          sec = item.slice(4, 6)
          mill = item.slice(7, 10)
          if (isNaN(Number(mill))) {
            mill = item.slice(7, 9)
            lrc = item.slice(10, item.lenght)
          } else {
            lrc = item.slice(11, item.lenght)
          }
          //对获取的时间进行拼接
          let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill)
          return { min, sec, mill, lrc, time } //返回一个每行歌词对象
        })
        //给每行歌词的对象，添加一个属性：下一行歌词的时间
        arr.forEach((item, i) => {
          if (i === arr.length - 1 || isNaN(arr[i + 1].time)) {
            item.nextTime = 100000
          } else {
            item.nextTime = arr[i + 1].time
          }
        })
      }
      return arr
    }
  },
  mounted() {
    this.addDuration()
  },
  props: ['musicList', 'isbtnShow', 'play', 'addDuration'],
  methods: {
    backHome() {
      this.isLyricShow = false
      this.updateDetailShow()
    },
    goPlay(num) {
      let index = this.playListIndex + num
      if (index < 0) {
        index = this.playList.length - 1
      } else if (index == this.playList.length) {
        index = 0
      }
      this.updateplayListIndex(index)
    },
    ...mapMutations(['updateDetailShow', 'updateplayListIndex'])
  },
  watch: {
    currentTime(newValue) {
      let p = document.querySelector('p.active')
      if (p && p.offsetTop > 300) {
        this.$refs.musicLyric.scrollTop = p.offsetTop - 300
      }
      if (newValue === this.duration) {
        // this.playListIndex += 1
        // if (this.playListIndex === this.playList.length - 1) {
        //   this.updateplayListIndex(0)
        // } else {
        //   this.updateplayListIndex(this.playListIndex)
        // }
        this.goPlay(1)
        this.play()
      }
    }
  },
  components: {
    Vue3Marquee
  }
}
</script>

<style lang='less' scoped>
.musicDetail {
  position: relative;
  width: 100%;
  height: 100%;
  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
  }
  .detailTop {
    width: 100%;
    height: 1rem;
    padding-top: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #fff;
    .detailTopLeft {
      height: 100%;
      width: 45%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .info {
        margin-left: 0.4rem;
        span {
          font-size: 0.24rem;
          color: #999;
        }
      }
    }
    .detailTopRight {
      padding-right: 0.2rem;
    }
  }
  .detailContent {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    .img_needle {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }
    .img_needle_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }
    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }
    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: rotate_ar 10s linear infinite;
    }
    .img_ar_active {
      animation-play-state: running;
    }
    .img_ar_pauesd {
      animation-play-state: paused;
    }
    @keyframes rotate_ar {
      0% {
        transform: rotateZ(0deg);
      }
      100% {
        transform: rotateZ(360deg);
      }
    }
  }
  .musicLyric {
    width: 100%;
    height: 8rem;
    padding: 0 0.2rem;
    margin-top: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    p {
      color: rgb(20, 3, 62);
      margin-bottom: 0.3rem;
    }
    .active {
      color: #fff;
      font-weight: 700;
    }
  }
  .detailFooter {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 3rem;
    margin: 0.2rem 0;
    color: #fff;
    .footerTop {
      width: 100%;
      height: 1rem;
      padding: 0 0.4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .footerContent {
      width: 100%;
      height: 1rem;
      padding: 0.3rem 0.2rem 0 0.2rem;
      .range {
        width: 100%;
        height: 0.06rem;
      }
    }
    .footer {
      width: 50%;
      height: 1rem;
      margin-left: 25%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
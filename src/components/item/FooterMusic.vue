<template>
  <!-- 底部音乐播放 -->
  <div class="footerMusic">
    <!-- 左侧歌曲图片、标题 -->
    <div class="footerLeft" @click="updateDetailShow">
      <img :src="playList[playListIndex].al.picUrl" alt="">
      <div>
        <p>{{playList[playListIndex].name}}</p>
        <span>横滑可以切换上下首哦</span>
      </div>
    </div>
    <!-- 右侧歌曲控件 -->
    <div class="footerRight">
      <van-icon name="play-circle-o" size=0.64rem @click="play" v-if='isbtnShow' />
      <van-icon name="pause-circle-o" size=0.64rem @click="play" v-else />
      <van-icon name="wap-nav" size=0.64rem />
    </div>
    <audio ref="audio" :src="`https://music.163.com/song/media/outer/url?id=${playList[playListIndex].id}.mp3`">
    </audio>
    <!-- 歌曲详情页 -->
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%',width:'100%' }">
      <MusicDetail :musicList='playList[playListIndex]' :play='play' :isbtnShow='isbtnShow' :addDuration='addDuration'>
      </MusicDetail>
    </van-popup>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import MusicDetail from '@/components/item/MusicDetail.vue'
export default {
  data() {
    return {
      interVal: 0 //用于启动或清除定时器
    }
  },
  computed: {
    ...mapState(['playList', 'playListIndex', 'isbtnShow', 'detailShow'])
  },
  components: {
    MusicDetail
  },
  mounted() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
  },
  updated() {
    this.$store.dispatch('getLyric', this.playList[this.playListIndex].id)
    this.addDuration()
  },
  methods: {
    play() {
      //判断音乐是否播放
      if (this.$refs.audio.paused) {
        this.$refs.audio.play()
        this.updateIsbtnShow(false)
        this.updateTime() //播放时启动定时器
      } else {
        this.$refs.audio.pause()
        this.updateIsbtnShow(true)
        clearInterval(this.interVal) //清除定时器
      }
    },
    addDuration() {
      this.updateDuration(this.$refs.audio.duration)
    },
    updateTime() {
      //设置定时器 更新歌曲当前时间
      this.interVal = setInterval(() => {
        this.updateCurrentTime(this.$refs.audio.currentTime)
      }, 100)
    },
    ...mapMutations(['updateIsbtnShow', 'updateDetailShow', 'updateCurrentTime', 'updateDuration'])
  },
  watch: {
    playListIndex() {
      //监听下标是否改变，当值改变时自动播放歌曲，并改变播放图标、启动定时器
      this.$refs.audio.autoplay = true
      if (this.$refs.audio.paused) {
        this.updateIsbtnShow(false)
        clearInterval(this.interVal)
        this.updateTime()
      }
    },
    playList() {
      //监听播放列表是否改变，判断播放图标是否为暂停，true时自动播放歌曲，并改变播放图标、启动定时器
      if (this.isbtnShow) {
        this.$refs.audio.autoplay = true
        this.updateIsbtnShow(false)
        clearInterval(this.interVal)
        this.updateTime()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.footerMusic {
  width: 100%;
  height: 1.4rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  border-top: 1px solid #999;
  .footerLeft {
    width: 60%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    img {
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
      border: 1px solid #ccc;
    }
    span {
      font-size: 0.24rem;
      color: #ccc;
    }
  }
  .footerRight {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
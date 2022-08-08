<template>
  <div class="user">
    <TopNav></TopNav>
    <div class="info">
      <div class="left">
        <img :src="user.profile.avatarUrl" alt="">
        <div>
          <p>{{user.profile.nickname}}</p>
          <span>LV{{user.level}}</span>
        </div>
      </div>
      <div class="right">
        <van-icon name="arrow" size=0.64rem />
      </div>
    </div>
    <div class="iconList">
      <div class="iconItem">
        <van-icon name="down" size=0.64rem />
        <span>本地下载</span>
      </div>
      <div class="iconItem">
        <van-icon name="back-top" size=0.64rem />
        <span>云盘</span>
      </div>
      <div class="iconItem">
        <van-icon name="bag" size=0.64rem />
        <span>已购歌曲</span>
      </div>
      <div class="iconItem">
        <van-icon name="star" size=0.64rem />
        <span>收藏</span>
      </div>
    </div>
    <div class="playlist">
      <div class="listTop">
        <span :class="{active:(this.list===1)}" @click="jump(1,'#list1')">创建的歌单</span>
        <span :class="{active:(this.list===2)}" @click="jump(2,'#list2')">收藏的歌单</span>
      </div>
      <div class="created">
        <div class="title" id="list1">创建的歌单({{userPlaylist.created.length}})</div>
        <div class="list" v-for="item in userPlaylist.created" :key="item">
          <img :src="item.coverImgUrl" alt="">
          <div>
            <p>{{item.name}}</p>
            <span>{{item.trackCount}}首</span>
          </div>
        </div>
      </div>
      <div class="subscribed">
        <div class="title" id="list2">收藏的歌单({{userPlaylist.subscribed.length}})</div>
        <div class="list" v-for="item in userPlaylist.subscribed" :key="item">
          <img :src="item.coverImgUrl" alt="">
          <div>
            <p>{{item.name}}</p>
            <span>{{item.trackCount}}首</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TopNav from '@/components/home/TopNav.vue'
import { getPlaylist, getUserInfo } from '@/request/api/user.js'
export default {
  data() {
    return {
      list: 1
    }
  },
  computed: {
    ...mapState(['user', 'userPlaylist'])
  },
  created() {
    if (this.userPlaylist.created == '') {
      this.getUPL(this.userPlaylist)
    }
  },
  components: {
    TopNav
  },
  methods: {
    async getUPL() {
      let res = await getPlaylist(this.user.profile.userId)
      this.$store.commit('updateUserPlaylist', res.data.playlist)
    },
    // async getinfo() {
    //   let res = await getUserInfo()
    //   console.log(res)
    //   this.$store.commit('updateUser', res.data)
    // },
    jump(num, selector) {
      this.list = num
      document.querySelector(selector).scrollIntoView({
        behavior: 'smooth'
      })
    }
  }
}
</script>

<style lang='less' scoped>
.user {
  width: 100%;
  height: 1.5rem;
  padding: 0.2rem;
  .info {
    width: 100%;
    padding: 0.2rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
      }
      div {
        display: flex;
        flex-direction: column;
        margin-left: 0.4rem;
        p {
          height: 0.8rem;
          font-weight: 700;
          line-height: 0.8rem;
        }
        span {
          height: 0.7rem;
          border: 1px solid #ccc;
          border-radius: 0.35rem;
          text-align: center;
          line-height: 0.7rem;
        }
      }
    }
  }
  .iconList {
    width: 100%;
    height: 1rem;
    margin-top: 0.4rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .iconItem {
      width: 45%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .playlist {
    width: 100%;
    padding: 0 0.2rem;
    margin-top: 0.4rem;
    .listTop {
      width: 100%;
      height: 0.5rem;
      // display: flex;
      margin-bottom: 0.2rem;
      align-items: center;
      text-align: center;
      span {
        padding: 0 0.4rem;
        font-weight: 700;
      }
      .active {
        border-bottom: 2px solid rgba(214, 110, 110, 0.5);
      }
    }
    .created,
    .subscribed {
      width: 100%;
      display: flex;
      flex-direction: column;
      margin-bottom: 0.4rem;
      border-radius: 0.2rem;
      background-color: rgba(214, 110, 110, 0.5);
      .title {
        width: 100%;
        height: 0.3rem;
        line-height: 0.3rem;
        font-size: 0.2rem;
        color: black;
        padding-left: 0.2rem;
        margin-top: 0.2rem;
      }
      .list {
        width: 100%;
        height: 1.5rem;
        display: flex;
        align-items: center;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.2rem;
          margin-left: 0.2rem;
        }
        div {
          width: 70%;
          height: 1rem;
          display: flex;
          flex-direction: column;
          margin-left: 0.2rem;
          p {
            width: 100%;
            height: 0.6rem;
            line-height: 0.6rem;
            font-size: 0.24rem;
            overflow: hidden;
          }
          span {
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            font-size: 0.16rem;
          }
        }
      }
    }
  }
}
</style>
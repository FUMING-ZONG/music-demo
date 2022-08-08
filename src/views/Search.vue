<template>
  <div class="Search">
    <div class="searchTop">
      <van-icon name="arrow-left" size=0.64rem @click="$router.go(-1)" />
      <input type="text" placeholder="陈奕迅" v-model="this.searchKey" @keydown.enter="enterKey">
    </div>
    <div class="searchHistory">
      <p>历史</p>
      <span v-for="item in keyWorlds" :key="item" @click="search(item)">{{item}}</span>
      <van-icon class="icon" name="delete-o" size=0.4rem @click="delHistory" />
    </div>
    <!-- 歌曲列表 -->
    <div class="itemlist">
      <!-- 循环渲染每个元素 -->
      <div class="item" v-for="(item,i) in searchList" :key="i">
        <div class="itemlfte" @click="updateIndex(item)">
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
import { getSearchMusic } from '@/request/api/home.js'
import { getMisic } from '@/request/api/item.js'
export default {
  data() {
    return {
      keyWorlds: [],
      searchKey: '',
      searchList: []
    }
  },
  created() {
    if (this.$route.query.name != undefined) {
      this.searchKey = this.$route.query.name
      this.enterKey()
    }
  },
  mounted() {
    this.keyWorlds = JSON.parse(localStorage.getItem('keyWorlds')) ? JSON.parse(localStorage.getItem('keyWorlds')) : []
  },
  components: {},
  methods: {
    async enterKey() {
      if (this.searchKey != '') {
        this.keyWorlds.unshift(this.searchKey)
        // 数组去重
        this.keyWorlds = [...new Set(this.keyWorlds)]
        //固定长度
        if (this.keyWorlds.length > 10) {
          this.keyWorlds.splice(this.keyWorlds.length - 1, 1)
        }
        //将搜索历史存入本地存储
        localStorage.setItem('keyWorlds', JSON.stringify(this.keyWorlds))
        //搜索
        this.search(this.keyWorlds)
        this.searchKey = ''
      }
    },
    delHistory() {
      localStorage.removeItem('keyWorlds')
      this.keyWorlds = []
    },
    async search(searchKey) {
      //获取搜索到的数据
      let res = await getSearchMusic(searchKey)
      if (res.data.result.songs === undefined) {
        return alert('未搜索到！')
      }
      //获取每首歌曲的信息
      for (let index = 0; index < res.data.result.songs.length; index++) {
        let res2 = await getMisic(res.data.result.songs[index].id)
        this.searchList[index] = res2.data.songs[0]
      }
    },
    updateIndex(item) {
      this.$store.commit('pushPlayList', item)
      this.$store.commit('updateplayListIndex', this.$store.state.playList.length - 1)
    }
  }
}
</script>

<style lang='less' scoped>
.Search {
  width: 100%;
  padding-bottom: 1.5rem;
  .searchTop {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    input {
      margin-left: 0.3rem;
      border: none;
      border-bottom: 1px solid #999;
      width: 90%;
      padding: 0.1rem;
    }
  }
  .searchHistory {
    width: 100%;
    padding: 0.2rem;
    position: relative;

    p {
      font-weight: 700;
    }
    span {
      display: inline-block;
      padding: 0.1rem 0.2rem;
      background-color: #ccc;
      border-radius: 0.4rem;
      margin: 0.1rem 0.2rem;
    }
    .icon {
      position: absolute;
      right: 0.2rem;
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
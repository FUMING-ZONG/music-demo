<template>
  <div class="sidebar">
    <div class="info" v-if="flag">
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
    <div class="info" v-show="!flag" @click="$router.push('/infoUser')">
      <div class="left">
        <img src="@/assets/logo.png" alt="">
        <div>
          <p>未登陆</p>
          <span>LV0</span>
        </div>
      </div>
      <div class="right">
        <van-icon name="arrow" size=0.64rem />
      </div>
    </div>
    <div class="list">
      <div class="listTop">
        <div>
          <span>
            <van-icon name="comment" />
          </span>
          <p>我的消息</p>
        </div>
        <div>
          <span>
            <van-icon name="diamond" />
          </span>
          <p>云贝中心</p>
        </div>
        <div>
          <span>
            <van-icon name="manager" />
          </span>
          <p>创作中心</p>
        </div>
      </div>
      <div class="listContent">
        <div>
          <span>
            <van-icon name="setting-o" />
          </span>
          <p>设置</p>
        </div>
        <div>
          <span>
            <van-icon name="tosend" />
          </span>
          <p>定时关闭</p>
        </div>
        <div>
          <span>
            <van-icon name="idcard" />
          </span>
          <p>在线免流</p>
        </div>
        <div>
          <span>
            <van-icon name="warn-o" />
          </span>
          <p>音乐黑名单</p>
        </div>
        <div>
          <span>
            <van-icon name="audio" />
          </span>
          <p>边听边存</p>
        </div>
      </div>
      <div class="listFooter">
        <div>帮助与反馈</div>
        <div>分享网易云音乐</div>
        <div>关于</div>
      </div>
      <div class="logout">退出登录</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      flag: false
    }
  },
  computed: {
    ...mapState(['isLogin'])
  },
  created() {
    this.change()
  },
  methods: {
    change() {
      if (localStorage.getItem('cookie')) {
        this.flag = true
      }
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang='less' scoped>
.sidebar {
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
  .list {
    width: 100%;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    .listTop,
    .listContent,
    .listFooter {
      width: 100%;
      margin: 0.2rem 0;
      background-color: rgba(214, 110, 110, 0.5);
      border-radius: 0.3rem;
      div {
        width: 100%;
        height: 0.5rem;
        display: flex;
        align-items: center;
        padding: 0 0.2rem;
        margin: 0.2rem 0;
        p {
          margin-left: 0.2rem;
        }
      }
    }
    .logout {
      width: 100%;
      height: 1rem;
      border-radius: 0.5rem;
      background-color: rgba(214, 110, 110, 0.5);
      line-height: 1rem;
      text-align: center;
    }
  }
}
</style>
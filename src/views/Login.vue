<template>
  <div class="login">
    <div class="close">
      <van-icon name="cross" size=0.64rem @click="$router.go(-1)" />
    </div>
    <div class="logo">
      <img src="@/assets/logo.png" alt="">
    </div>
    <div class="loginContent">
      <div class="input" v-show="!isShowCode">
        <input type="email" name="email" class="email" placeholder="@163.com" v-model="email">
        <input type="password" name="password" class="password" placeholder="密码" v-model="password">
      </div>
      <div class="input" v-show='isShowCode'>
        <input type="text" name='phone' class="phone" placeholder="手机号" v-model="phone">
        <input type="text" name='code' class="code" placeholder="验证码" v-model="captcha">
        <button @click="Sent" ref="button">获取验证码</button>
      </div>
      <span @click="Login">登录</span>
      <span @click="isShowCode=!isShowCode">短信登录</span>
      <span @click="$router.go(-1)">立即体验</span>
    </div>
    <div class="loginFooter">
      <span>
        <van-icon name="qq" size=1rem />
      </span>
      <span>
        <van-icon name="wechat" size=1rem />
      </span>
      <span>
        <van-icon name="weibo" size=1rem />
      </span>
      <span>
        <van-icon name="more" size=1rem />
      </span>
    </div>
  </div>
</template>

<script>
import { getCaptcha, getCaptchaLogin } from '@/request/api/home.js'
import { getUser } from '@/request/api/item.js'
export default {
  data() {
    return {
      phone: '',
      email: '',
      password: '',
      captcha: '',
      isShowCode: false
    }
  },
  methods: {
    Sent() {
      if (this.phone != '' && this.phone.length == 11) {
        this.$refs.button.disabled = true
        let res = getCaptcha(this.captcha)
        if (res.data.code != 200) {
          alert('发送失败！')
        }
        var time = setTimeout(() => {
          this.$refs.button.disabled = false
          // this.$refs.button.innerText = '获取验证码'
          clearTimeout(time)
        }, 5000)
      } else {
        alert('输入号码有误！')
      }
    },
    async Login() {
      if (this.isShowCode == false) {
        if (this.email != '' && this.password != '') {
          let res = await this.$store.dispatch('getLogin', { email: this.email, password: this.password })
          if (res.data.code === 200) {
            this.$store.commit('updateIsLogin', true)
            this.$store.commit('updateToken', res.data.token)
            this.$store.commit('updateCookie', res.data.cookie)
            let res2 = await getUser(res.data.account.id)
            this.$store.commit('updateUser', res2.data)
            this.$router.push('/infoUser', res.data.token)
          } else {
            alert('手机号或密码错误')
            this.password = ''
          }
        } else {
          alert('输入不完整！')
        }
      } else if (this.phone != '' && this.captcha != '') {
        let res = await getCaptchaLogin(this.phone, this.captcha)
        if (res.data.code === 200) {
          this.$store.commit('updateIsLogin', true)
          this.$store.commit('updateToken')
          this.$store.commit('updateCookie', res.data.cookie)
          let res2 = await getUser(res.data.account.id)
          this.$store.commit('updateUser', res2.data)
          this.$router.push('/infoUser', res.data.token)
        } else {
          alert('验证码错误！')
          this.captcha = ''
        }
      } else {
        alert('输入不完整！')
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login {
  width: 100%;
  height: 13.34rem;
  position: relative;
  background-color: #bd3126;
  .close {
    width: 100%;
    height: 1rem;
    padding: 0.2rem;
  }
  .logo {
    width: 100%;
    padding: 0.5rem;
    text-align: center;
    img {
      width: 1.7rem;
      height: 1.7rem;
      border-radius: 50%;
    }
  }
  .loginContent {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    .input {
      margin-left: 15%;
    }
    input {
      width: 70%;
      margin: 0.5rem;
      border: none;
      border-bottom: 3px solid rgb(27, 25, 25);
      background-color: #bd3126;
      color: black;
    }
    input::placeholder {
      color: black;
    }
    button {
      width: 15%;
      padding: 0.02rem;
      border-radius: 0.2rem;
      font-size: 0.24rem;
    }
    .code {
      width: 50%;
    }
    span {
      width: 4rem;
      height: 1rem;
      margin: 0.2rem;
      border: 1px solid black;
      border-radius: 0.5rem;
      line-height: 1rem;
      text-align: center;
      color: #fff;
    }
  }
  .loginFooter {
    width: 100%;
    height: 2rem;
    padding: 0 0.2rem;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      display: block;
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 50%;
      border: 1px solid black;
      line-height: 1.9rem;
      text-align: center;
      color: black;
    }
  }
}
</style>
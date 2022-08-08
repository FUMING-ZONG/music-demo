import { createStore } from 'vuex'
import { getMisicLyric } from '@/request/api/item.js'
import { getEmailLogin } from '@/request/api/home.js'
export default createStore({
  state: {
    playList: [
      //播放列表
      {
        id: 418602088,
        name: 'Nevada',
        al: {
          id: 34750015,
          name: 'Nevada',
          picUrl: 'https://p1.music.126.net/X_Ukd1BhXdDwsz4NqrisNA==/109951163640412456.jpg',
          pic_str: '109951163640412456',
          pic: 109951163640412450
        },
        ar: [
          {
            id: 747030,
            name: 'Vicetone',
            tns: [],
            alias: []
          },
          {
            id: 1097153,
            name: 'Cozi Zuehlsdorff',
            tns: [],
            alias: []
          }
        ]
      }
    ],
    playListIndex: 0, //播放列表下标默认为0
    isbtnShow: true, //暂停按钮的显示
    detailShow: false, //歌曲详情页显示
    lyricList: {
      //歌词
      lyric: ''
    },
    currentTime: 0, //歌曲当前时间
    duration: 0, //歌曲总时长
    isLogin: false, //用于记录用户是否登录
    isFooterShow: true, //是否显示底部播放器
    topArtists: [], //热门歌手
    token: '',
    cookie: '',
    user: {}, //用户信息
    userPlaylist: {
      created: [],
      subscribed: []
    }
  },
  getters: {},
  mutations: {
    updateIsbtnShow(state, value) {
      state.isbtnShow = value
    },
    updatePlayList(state, value) {
      state.playList = value
    },
    pushPlayList(state, value) {
      state.playList.push(value)
    },
    updateplayListIndex(state, value) {
      state.playListIndex = value
    },
    updateDetailShow(state) {
      state.detailShow = !state.detailShow
    },
    updateLyricList(state, value) {
      state.lyricList = value
    },
    updateCurrentTime(state, value) {
      state.currentTime = value
    },
    updateDuration(state, value) {
      state.duration = value
    },
    updateTopArtists(state, value) {
      state.topArtists = value
    },
    updateIsLogin(state, value) {
      state.isLogin = true
    },
    updateToken(state, value) {
      state.token = value
      localStorage.setItem('token', state.token)
    },
    updateCookie(state, value) {
      state.cookie = value
      localStorage.setItem('cookie', state.cookie)
    },
    updateUser(state, value) {
      state.user = value
    },
    updateUserPlaylist(state, arr) {
      for (let index = 0; index < arr.length; index++) {
        if (arr[index].subscribed === false) {
          state.userPlaylist.created.push(arr[index])
        } else if (arr[index].subscribed === true) {
          state.userPlaylist.subscribed.push(arr[index])
        }
      }
      state.userPlaylist.created = [...new Set(state.userPlaylist.created)]
      state.userPlaylist.subscribed = [...new Set(state.userPlaylist.subscribed)]
    }
  },
  actions: {
    async getLyric(context, value) {
      let res = await getMisicLyric(value)
      context.commit('updateLyricList', res.data.lrc)
    },
    async getLogin(context, value) {
      let res = await getEmailLogin(value)
      return res
    }
  },
  modules: {}
})

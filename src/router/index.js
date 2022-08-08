import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store/index.js'
import HomeView from '../views/HomeView.vue'
import ItemMusic from '../views/ItemMusic.vue'
import Search from '../views/Search.vue'
import Login from '../views/Login.vue'
import InfoUser from '../views/InfoUser.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView
  },
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: ItemMusic
  },
  {
    path: '/Search',
    name: 'Search',
    component: Search
  },
  {
    path: '/Login',
    name: 'login',
    component: Login
  },
  {
    path: '/InfoUser',
    name: 'infoUser',
    beforeEnter: (to, from, next) => {
      if (store.state.isLogin || store.state.token || localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    },
    component: InfoUser
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    store.state.isFooterShow = false
    next()
  } else {
    store.state.isFooterShow = true
    next()
  }
})

export default router

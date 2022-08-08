<template>
  <itemMusicTop :playlist='state.playlist' :user='state.user'></itemMusicTop>
  <itemMusicList :itemlist='state.itemlist' :subscribedCount='state.playlist.subscribedCount'></itemMusicList>
</template>

<script>
import { useRoute } from 'vue-router'
import { onMounted, reactive } from 'vue'
import { getMusicItemList, getItemList } from '@/request/api/item.js'
import { getUser } from '@/request/api/item.js'
import itemMusicTop from '@/components/item/itemMusicTop.vue'
import itemMusicList from '@/components/item/itemMusicList.vue'
export default {
  setup() {
    const state = reactive({
      playlist: {},
      user: {
        nickname: null,
        userimgurl: ''
      },
      itemlist: []
    })
    onMounted(async () => {
      //获取歌单详情
      let id = useRoute().query.id
      let res = await getMusicItemList(id)
      state.playlist = res.data.playlist
      //获取歌单用户
      let res2 = await getUser(state.playlist.userId)
      state.user.nickname = res2.data.profile.nickname
      state.user.userimgurl = res2.data.profile.avatarUrl
      //获取歌单列表
      let res3 = await getItemList(id)
      state.itemlist = res3.data.songs
    })
    return { state }
  },
  components: {
    itemMusicTop,
    itemMusicList
  }
}
</script>

<style>
</style>
import service from '../index.js'
//获取歌单详情页的数据
export function getMusicItemList(id) {
  return service({
    method: 'GET',
    url: `/playlist/detail?id=${id}`
  })
}
//获取歌单动态详情 评论数、分享数、是否收藏、播放数
export function getCount(id) {
  return service({
    method: 'GET',
    url: `/playlist/detail/dynamic?id=${id}`
  })
}
//获取歌单所有歌曲
export function getItemList(id) {
  return service({
    method: 'GET',
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`
  })
}
//获取歌词
export function getMisicLyric(id) {
  return service({
    method: 'GET',
    url: `/lyric?id=${id}`
  })
}
//获得歌曲详情
export function getMisic(id) {
  return service({
    method: 'GET',
    url: `/song/detail?ids=${id}`
  })
}
//获取用户信息
export function getUser(id) {
  return service({
    method: 'GET',
    url: `/user/detail?uid=${id}`
  })
}

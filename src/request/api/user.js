import service from '../index.js'
//获取用户歌单
export function getPlaylist(id) {
  return service({
    method: 'GET',
    url: `/user/playlist?uid=${id}&cookie=${localStorage.getItem('cookie')}`
  })
}
//获取用户详情
export function getUserInfo() {
  return service({
    method: 'GET',
    url: `/user/account?cookie=${localStorage.getItem('cookie')}`
  })
}

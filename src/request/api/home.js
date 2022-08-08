import service from '../index.js'
//获取首页轮播图的数据
export function getBanner() {
  return service({
    method: 'GET',
    url: '/banner?type=2'
  })
}
//发现歌单
export function getMusicList() {
  return service({
    method: 'GET',
    url: '/personalized?limit=10'
  })
}
//热门歌手
export function getTopArtists() {
  return service({
    method: 'GET',
    url: '/top/artists?offset=0&limit=30'
  })
}
//搜索
export function getSearchMusic(keywords) {
  return service({
    method: 'GET',
    url: `/cloudsearch?keywords=${keywords}`
  })
}
//邮箱登录
export function getEmailLogin(data) {
  return service({
    method: 'GET',
    url: `/login?email=${data.email}&password=${data.password}`
  })
}
//短信登录
export function getCaptcha(phone) {
  return service({
    method: 'GET',
    url: `/captcha/sent?phone=${phone}`
  })
}
//校验 验证码
export function getCaptchaLogin(phone, captcha) {
  return service({
    method: 'GET',
    url: `/captcha/verify?phone=${phone}&captcha=${captcha}`
  })
}

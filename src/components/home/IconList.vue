<template>
  <div class="iconList">
    <div class="iconItem">
      <van-icon name="good-job-o" size=0.8rem />
      <span>每日推荐</span>
    </div>
    <div class="iconItem">
      <van-icon name="live" size=0.8rem />
      <span>私人FM</span>
    </div>
    <div class="iconItem">
      <van-icon name="column" size=0.8rem />
      <span>歌单</span>
    </div>
    <div class="iconItem">
      <van-icon name="bar-chart-o" size=0.8rem />
      <span>排行榜</span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.iconList {
  width: 100%;
  height: 1.4rem;
  margin-top: 0.2rem;
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
</style>
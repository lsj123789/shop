<template>
  <div class="container">
    <img src="../assets/send.png" alt="图片加载失败，请重试！" class="img-con">
    <div class="content">4
      <div>
        <img class="content-item" src="../assets/eye.png" alt="图片加载失败，请重试！">
      </div>4
    </div>
    <div class="toast-con">哎呀，页面走丢啦~</div>
    <router-link to="/">
      <div class="back-con">点我返回首页</div>
    </router-link>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.container {
  background-color: #5c377a;
  height: 100vh;
  background: -webkit-linear-gradient(top, #5c377a, #51aed6);
}
.img-con {
  height: 1.5rem;
  width: 1.8rem;
  box-sizing: border-box;
  margin-top: 2rem;
  margin-left: 2.4rem;
}
.content {
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  height: 4rem;
  font-size: 2rem;
  color: #f8e6c4;
  &-item {
    margin: 42% 10px;
    background-color: #f8e6c4;
    height: 1.8rem;
    width: 1.6rem;
    border-radius: 50%;
    box-shadow: 0 0 1rem #FFFC33;
  }
}
.toast-con,
.back-con {
  text-align: center;
  font-size: 0.3rem;
  color: black;
}
</style>




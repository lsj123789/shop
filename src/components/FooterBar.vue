<template>
  <div>
    <van-tabbar v-model="active" @change="change">
      <van-tabbar-item icon="wap-home" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="user-o" to="/profileDetail">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active:0//默认进入界面后第一个带颜色，第一个的索引是0
    };
  },
  created(){
    this.active = parseInt(localStorage.getItem('active'))//想获取谁 key就是谁 localStorage只能存储字符串型 active是整型
  },
  methods:{
    change(active){
      localStorage.setItem('active',active)
    }
  }
};
</script>




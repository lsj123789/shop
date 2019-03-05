<template>
  <div>
    <van-nav-bar title="商品详情" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
    <img :src="hotProductsDetail.img" alt="图片加载失败，请重试！" class="hotProductsDetail-img">
    <div class="hotProductsDetail">
      <p class="hotProductsDetail-name">名称：{{hotProductsDetail.name}}</p>
      <p class='hotProductsDetail-owner'>所有者：{{hotProductsDetail.owner}}</p>
      <p class="hotProductsDetail-price">价格：￥{{hotProductsDetail.price}}</p>
    </div>
    <div class="toolBar">
      <van-goods-action>
        <van-goods-action-mini-btn icon="chat-o" text="客服"/>
        <van-goods-action-mini-btn icon="cart-o" text="购物车"/>
        <van-goods-action-big-btn text="加入购物车"/>
        <van-goods-action-big-btn primary text="立即购买"/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      hotProductsDetail: {}
    };
  },
  created() {
    this.hotProductsDetail = JSON.parse(localStorage.getItem(JSON.stringify('item')))
  }
};
</script>

<style lang="scss" scoped>
.hotProductsDetail {
  padding: 0.2rem;
  &-img {
    width: 100%;
    height: 5rem;
  }
  &-name,
  &-owner {
    color: black;
    font-weight: bold;
  }
  &-price {
    color: red;
    font-size: 0.3rem;
  }
}
</style>





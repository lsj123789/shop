<template>
  <div>
    <van-nav-bar title="购物车"></van-nav-bar>
    <van-card
      v-for="(item,index) in productList"
      :key="index"
      :price="item.price"
      :desc="item.company"
      :title="item.name"
      :thumb="item.img"
    >
      <div slot="footer">
        <van-button size="mini" @click="delCart(item._id,index)">删除</van-button>
      </div>
    </van-card>
    <van-submit-bar class="submitBar" :price="totalPrice" button-text="提交订单" @submit="onSubmit"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      productList: []
    };
  },
  computed: {
    //当一个属性 会依赖于其他属性 当其他属性变化时 这个属性也随之变化的情况 就用computed computed可缓存  watch是一个属性会引起其他属性的变化时使用
    ...mapState(["userInfo"]),
    totalPrice() {
      return (
        this.productList.reduce((sum, elem) => {
          //reduce方法会接收一个函数作为累加器 函数中的每一个值从左到右缩减 最后变成一个值
          sum += elem.price; //elem元素是购物车里每一个商品价格
          return sum;
        }, 0) * 100
      ); //从0开始叠加，card组件里的price是以分为单位
    }
  },
  created() {
    //验证用户是否登录
    if (JSON.stringify(this.userInfo) === "{}") {
      this.$toast.fail("请先登录！");
      this.$router.push("/profile");
    } else {
      axios({
        url: url.getCart,
        method: "get",
        params: {
          userId: this.userInfo._id
        }
      })
        .then(res => {
          for (let item of res.data) {
            //es6新语法 循环谁 of谁
            this.productList.push(item.productId); //把每个productId中对应的信息加到数组productList中
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  methods: {
    onSubmit: function() {
      this.$toast.success("应该进入付款页面,但是功能还没写");
    },
    delCart: function(id, index) {
      //删除数据库中的数据 如果删除成功 进入回调函数
      axios({
        url: url.delCart,
        method: "post",
        data: {
          id: id
        }
      })
        .then(res => {
          this.productList.splice(index, 1); //splice是在一个函数中删除数组中的任意一条数据
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss">
.submitBar {
  margin-bottom: 1rem;
}
</style>

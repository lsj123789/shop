<template>
  <div>
    <van-nav-bar title="商品类型" style="background-color:#eee"></van-nav-bar>
    <div class="category">
      <van-row>
        <van-col span="6" class="left-con">
          <ul>
            <li
              @click="selectCategory(item.typeId,index)"
              :class="{active:active==index}"
              v-for="(item,index) in types"
              :key="index"
            >{{item.typeName}}</li>
          </ul>
        </van-col>
        <van-col span="18" class="right-con">
          <van-list class="content" @load="onload" :finished="finished" finished-text="没有更多啦">
            <div
              class="content-item"
              v-for="(item,index) in productList"
              :key="index"
              @click="goDetail(item._id)"
            >
              <img :src="item.img" alt="图片加载失败，请重试！">
              <p class="content-item-name">{{item.name}}</p>
              <p>￥{{item.price}}</p>
            </div>
          </van-list>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      types: [],
      active: 0, //默认索引为0的li样式为active里的样式
      productList: [],
      typeId: 1, //当前选中的类型的id
      start: 0, //当前我从第几条数据开始读取
      limit: 10, //一次要读取多少条数据
      loading: false,
      finished: false //当前数据是否全部被取完
    };
  },
  methods: {
    selectCategory(typeId, index) {
      this.active = index;
      this.typeId = typeId;
      this.productList = []; //每次选中时商品数组都应有初始值 不然始终显示的是一开始的那十条数据
      this.finished = false; //每次选择一个类型时 finished值应该为false 不然不会显示相应商品详情
      this.getProductList();
    },
    getProductList() {
      axios({
        url: url.getProductsByType,
        method: "get",
        params: {
          typeId: this.typeId,
          start: this.productList.length, //start与数组当前长度有关
          limit: this.limit
        }
      })
        .then(res => {
          if (res.data.length != 0) {
            //取回来的数据长度只要不等于0 就说明数据没取完 就要进行数组拼接
            this.productList = this.productList.concat(res.data); //数组拼接 避免数组直接赋值 后面的值取代了前面的值
          } else {
            this.finished = true; //数据取完
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    onload() {
      //下拉加载
      setTimeout(() => {
        this.loading = false;
        this.getProductList(); //下拉继续加载后十条数据
      }, 1000); //设置定时器只是为了看到加载状态
    },
    goDetail(id) {
      this.$router.push({
        path: "/detail",
        query: {
          id: id
        }
      });
    }
  },

  created() {
    axios({
      url: url.getTypes
    })
      .then(res => {
        this.types = res.data;
        this.selectCategory(this.typeId, this.active); //获取类型后 默认选择第一个样式为active 点击时会切换active
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='scss'>
.left-con {
  background-color: #eeeeee;
  li {
    height: 0.6rem;
    line-height: 0.6rem;
    text-align: center;
    border-bottom: 1px solid white;
  }
  .active {
    background-color: #fff;
  }
}
.right-con {
  position: fixed;
  top: 46px;
  bottom: 1rem;
  right: 0;
  overflow-y: scroll; //产生纵向滚动条
  .content {
    display: flex;
    padding-bottom: 1rem;
    flex-wrap: wrap; //根据宽度去换行
    &-item {
      width: 40%;
      padding: 0 10px;
      text-align: center;
      img {
        width: 2rem;
        height: 2rem;
      }
      &-name {
        //改变农机商品名字的长 超出部分以...形式显示 但这种方法存在兼容性问题
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
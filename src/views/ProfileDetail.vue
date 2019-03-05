<template>
  <div>
    <van-nav-bar title="我的商城"></van-nav-bar>
    <div class="user-con">{{userInfo}}</div>
    <van-cell title="我的地址" is-link to="/address"/>
    <van-button type="danger" size="large" @click="loginHandle" class="button-con">退出登录</van-button>
  </div>
</template>


<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },
  methods: {
    loginHandle() {
      this.$router.push("/profile");
    },
  },
  created() {
    if (JSON.stringify(this.userInfo) === "{}") {
      this.$toast.fail("请先登录");
      this.$router.push("/profile");
    }
  }
};
</script>

<style lang="scss" scoped>
.user-con {
  height: 2rem;
  width: 2rem;
  background-color: #ffffcc;
  box-shadow: 0 0 20px gold;
  border-radius: 50%;
  text-align: center;
  line-height: 2rem;
  margin: 0.5rem auto;
}
.button-con {
  bottom: 0;
}
</style>



<template>
  <div>
    <van-nav-bar title="我的地址" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
    <van-address-list v-model="chosenAddressId" :list="list" @add="onAdd" @edit="onEdit"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      chosenAddressId: "",
      list: []
    };
  },
  computed: {
    ...mapState(["userInfo"])
  },

  created() {
    axios({
      url: url.getAddress,
      method: "get",
      params: {
        userName: this.userInfo.userName
      }
    })
      .then(res => {
        this.list = res.data;
      })
      .catch(err => {
        console.log(err);
      });
  },

  methods: {
    onAdd() {
      this.$router.push("/setAddress");
    },

    onEdit(item, index) {
      this.$toast.success("编辑地址:" + index);
    }
  }
};
</script>

<style lang="scss">
</style>



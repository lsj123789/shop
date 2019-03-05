<template>
  <div>
    <van-nav-bar title="我的地址" left-text="返回" @click-left="$router.go(-1)"></van-nav-bar>
    <van-cell-group>
      <van-field v-model="name" required clearable label="姓名" placeholder="请输入姓名"/>
      <van-field v-model="tel" label="手机号" placeholder="请输入手机号" required clearable/>
      <van-field v-model="address" required clearable label="地址" placeholder="请输入详细地址"/>
    </van-cell-group>
    <van-button type='danger' size='large' @click="save">提交</van-button>
  </div>
</template>

<script>
import {mapState} from 'vuex';
import axios from "axios";
import url from "@/service.config.js";
export default {
  data() {
    return {
      name:'',
      tel:'',
      address:'',
    };
  },
  computed:{
    ...mapState(['userInfo'])
  },
  methods: {
   save(){
      axios({
        url:url.setAddress,
        method:'post',
        data:{
          name:this.name,
          tel:this.tel,
          address:this.address,
          userName:this.userInfo.userName
        }
      }).then(res=>{
        this.$toast.success('保存成功！')
        this.name = this.tel = this.address = ''
      }).catch(err=>{
        console.log(err);
        this.$toast.fail('保存失败')
      })
   }
  }
};
</script>

<style lang="scss">
</style>
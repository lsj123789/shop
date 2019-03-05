<template>
  <div>
    <van-tabs>
      <van-tab title="登录">
        <van-cell-group>
          <!-- required 用户名前面显示星号 表示必填 clearable 输入框后面有×号 输入错误可以删除 -->
          <van-field
            label="用户名"
            placeholder="‘请输入用户名"
            required
            clearable
            v-model="loginUsername"
          >用户名</van-field>
          <van-field
            label="密码"
            type="password"
            placeholder="请输入密码"
            required
            clearable
            v-model="loginPassword"
          >密码</van-field>
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="loginHandler" >登录</van-button>
        </div>
      </van-tab>

      <van-tab title="注册">
        <van-cell-group>
          <van-field
            label="用户名"
            placeholder="请输入用户名"
            required
            clearable
            v-model="registeUsername"
          >用户名</van-field>
          <van-field
            label="用户名"
            type="password"
            placeholder="请输入用户名"
            required
            clearable
            v-model="registePassword"
          >密码</van-field>
        </van-cell-group>
        <div>
          <van-button type="primary" size="large" @click="registeHandle">注册</van-button>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import axios from "axios";
import url from "@/service.config.js";
import { mapActions } from 'vuex';//map映射的意思 把vuex里面的actions映射到mapActions()中
export default {
  data() {
    return {
      loginUsername: "",
      loginPassword: "",
      registeUsername: "",
      registePassword: ""
    };
  },
  methods: {
      ...mapActions(['loginAction']),
    registeHandle() {
      axios({
        url: url.registeUser,
        method: "post",
        data: {
          userName: this.registeUsername,
          password: this.registePassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            this.$toast.success("注册成功 赶快登录吧！");
            this.registeUsername = this.registePassword = "";
          } else {
            this.$toast.fail("该用户名已被占用，请重新输入！");
            (this.registeUsername = this.registePassword = ""),
              console.log(err);
          }
        })
        .catch(err => {
          this.$toast.fail("该用户名已被占用，请重新输入！");
        });
    },
    //登录的处理方法
    loginHandler() {
      axios({
        url: url.loginUser,
        method: "post",
        data: {
          userName: this.loginUsername,
          password: this.loginPassword
        }
      })
        .then(res => {
          if (res.data.code == 200) {
            //模拟网络不好的情况
            new Promise((resolve, reject) => {
              //Promise是对异步操作进行管理的
              setTimeout(() => {
                resolve();
              }, 1000); //一秒以后再调用成功的方法resolve（）
            })
              .then(() => {
                this.$toast.success("登录成功！"); 
                this.loginAction(res.data.userInfo);
                this.$router.go(-1);
              })
              .catch(err => {
                this.$toast.fail("密码错误，请重新输入！");
                console.log(err);
              });
          }
        })
        .catch(err => {
          this.$toast.fail("用户名错误，请重新输入");
        });
    }
  }
};
</script>

<style lang="scss">
</style>
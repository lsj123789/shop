import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {//数据池 存储数据
    userInfo: {},
  },
  getters: {//计算属性 基于state的二次包装 用于数据筛选 多个数据相关性的计算

  },
  mutations: {//函数 改变state数据的唯一途径 不能处理异步操作
    changeLogin(state, status) {//state就是上面的state
      state.userInfo = status;
    }
  },
  actions: {//可以处理异步操作 用于提交mutations
    loginAction({ commit }, user) {//user对应的就是mutations里的status 作为参数传出去
      commit('changeLogin', user)//调用mutations里的方法 
    }
  }
})

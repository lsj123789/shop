import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant';


Vue.use(Lazyload);

import "@/assets/css/reset.css"//引入reset.css 重置一些标签自带的属性
import "@/assets/js/rem.js"//引入rem.js rem
import mock from '@/mock/mock.js'

import {Sku,
  AddressList,
  Area,
  Cell,
  AddressEdit,
  SubmitBar,
  Card,
  GoodsAction,
  GoodsActionBigBtn,
  GoodsActionMiniBtn, List, PullRefresh, Row, Col, Toast, Button, CellGroup, Field, Tab, Tabs, NavBar, Icon, Tabbar, TabbarItem, Swipe, SwipeItem
} from 'vant';
Vue.use(Sku).use(AddressList).use(Area).use(AddressEdit).use(Cell).use(SubmitBar).use(Card).use(GoodsActionMiniBtn).use(GoodsActionBigBtn).use(GoodsAction).use(PullRefresh).use(List).use(Tab).use(Row).use(Col).use(Toast).use(Button).use(CellGroup).use(Field).use(Tabs).use(NavBar).use(Icon).use(Tabbar).use(TabbarItem).use(Swipe).use(SwipeItem);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

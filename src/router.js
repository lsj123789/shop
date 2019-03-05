import Vue from 'vue'
import Router from 'vue-router'
let Home = ()=>import('./views/Home.vue');
import Cart from './views/Cart.vue'
let Category = ()=>import('./views/Category.vue');
let Profile = ()=>import('./views/Profile.vue'); 
import Detail from './views/Detail.vue'
import FooterBar from './components/FooterBar.vue'
let Error = ()=>import('./views/Error.vue')
let HotProductsDetail = ()=> import('./views/HotProductsDetail')
let ProfileDetail = () => import('./views/ProfileDetail')
let Address = ()=> import('./views/Address')
let SetAddress = ()=> import('./views/SetAddress')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',//地址
      name: 'home',
      components: {
        default: Home,
        'footer-bar': FooterBar
      },
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/cart',
      name: 'cart',
      components:{
        default:Cart,
        'footer-bar':FooterBar
      },
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/category',
      name: 'category',
      components:{
        default:Category,
        'footer-bar':FooterBar
      },
      meta:{
        keepAlive:true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      components:{
        default:Profile,
        'footer-bar':FooterBar
      },
      meta:{
      keepAlive:true
      }
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    },
    {
      path:'/hotProductsDetail',
      name:'hotProductsDetail',
      component:HotProductsDetail
    },
    {
      path:'/profileDetail',
      name:'profileDetail',
      components:{
        default:ProfileDetail,
        'footer-bar':FooterBar
      }
    },
    {
      path:'/address',
      name:'address',
      component:Address
    },
    {
      path:'/setAddress',
      component:SetAddress
    },
    {
      path:'*',
      component:Error
    }
  ]
})

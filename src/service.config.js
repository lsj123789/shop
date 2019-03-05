const MOCKURL = 'http://www.shop.com/'; // mock模拟
const SERVERURL = 'http://localhost:3000/';//真实url

const URL = {
   getVarietyItem: MOCKURL + "getVarietyItem",
  //  hotProductsDetail:MOCKURL + 'hotProductsDetail',
   registeUser:SERVERURL + 'user/registeUser',
   loginUser:SERVERURL + 'user/loginUser',
   getTypes:SERVERURL + 'type/getTypes',
   getProductsByType:SERVERURL + 'product/getProductsByType',
   getDetail:SERVERURL + 'product/getDetail',
   addCart:SERVERURL + 'cart/addCart',
   getCart:SERVERURL  + 'cart/getCart',
   delCart:SERVERURL + 'cart/delCart',
   setAddress:SERVERURL + 'address/setAddress',
   getAddress:SERVERURL + 'address/getAddress',
 }

 export default URL;//导出url
 

const Koa = require('koa');
const app = new Koa();


//前端项目在8080端口 后端在3000端口 解决跨域问题
const cors = require('koa2-cors');
app.use(cors({//里面的配置可以指定哪些源头（即前端地址）可以请求我们的后端
    origin: ['http://localhost:8080'],
    credentials: true//证书
}));


//接收前端post请求 post请求在body体里面 所以需要安装koa-bodyparser解析一下
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//加载路由
const Router = require('koa-router');
let user = require('./controller/user.js');//user是前端service.config.js中的user/registeUser
let product = require('./controller/product.js');//现在的product变量就代表后面的文件
let type = require('./controller/type.js');
let cart = require('./controller/cart.js')
let address = require('./controller/address.js')

let router = new Router();

router.use('/user', user.routes());
router.use('/product',product.routes());
router.use('/type',type.routes());
router.use('/cart',cart.routes())
router.use('/address',address.routes())

app.use(router.routes());
app.use(router.allowedMethods());//只允许特定方法进行请求

const { connect, initSchemas } = require('./init.js');
(async () => {
    await connect();
    initSchemas();
})//用await 等待连接成功时 再去进行init初始化
    ();//调用函数

app.use(async (ctx) => {
    ctx.body = 'hello'
})

app.listen(3000, () => {
    console.log('start shop_server');
})
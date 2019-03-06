const mongoose = require('mongoose');
const Koa = require('koa');
const Router = require('koa-router');
let router = new Router();
const fs = require('fs');//node下的fs通过node对系统文件或者mongod进行读写操作

router.get('/insertProductInfo', async (ctx) => {
    //读文件 第一个参数是文件路径 第二个参数是以什么编码去读文件 第三个参数是一个函数 data表示读取到的每一条数据
    fs.readFile('./data/product.json', 'utf8', (err, data) => {
        data = JSON.parse(data);//读到的数据是string型的 需要转化成对象 JSON.parse把字符串转化成对象
        console.log(data);
        let count = 0;//计数器 监控读取数据的条数
        const Product = mongoose.model('Product');//加载model 通过model 往product集合写数据
        data.map((value, index) => {//遍历每一条数据 两个参数分别为当前数据值和索引
            console.log(value);
            let product = new Product(value);
            product.type = Math.floor(Math.random() * 8) + 1;//随机生成product的类型 范围是1~8
            product.save().then(() => {
                count++;
                console.log('成功保存了' + count + '条数据');
            }).catch(err => {
                console.log('失败了' + error);
            })
        })
    });
    ctx.body = '导入数据';//没有ctx.body会报一个404的错误
})


router.get('/getProductsByType',async(ctx)=>{
    const Product = mongoose.model('Product');
    //分页用skip 表示从哪条数据开始 查询多少条 ctx.query获取到的是一个字符型 skip需要的是整型 用parse转换一下 
    await Product.find({type:ctx.query.typeId}).skip(parseInt(ctx.query.start)).limit(parseInt(ctx.query.limit)).exec().then(res=>{ 
        ctx.body = res;
    })
})


router.get('/getDetail',async(ctx)=>{
    const Product = mongoose.model('Product')
    await Product.findOne({_id:ctx.query.id}).exec().then(res=>{
        ctx.body = res;
    })
})

module.exports = router;//router 就是上面router.get中的router
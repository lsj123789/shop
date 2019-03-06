const mongoose = require('mongoose')
const Koa = require('koa')
const Router = require('koa-router')
let router = new Router()


router.post('/addCart', async (ctx) => {
    const Cart = mongoose.model('Cart')
    const cart = new Cart(ctx.request.body)
    await cart.save().then(() => {
        ctx.body = {
            code: 200,
            message: '添加成功'
        }

    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: err
        }
    })
})


router.get('/getCart', async (ctx) => {
    const Cart = mongoose.model('Cart');
    //populate()里的参数是 通过哪一个字段去关联的 因为通过productId可以指向product这个集合
    await Cart.find({ userId: ctx.query.userId }).populate('productId').exec().then(res => {
        ctx.body = res;
    }).catch(err => {
        console.log(err)
    })
})


router.post('/delCart', async (ctx) => {
    const Cart = mongoose.model('Cart')
    const id = ctx.request.body.id;
    await Cart.deleteOne({ productId: id }).then(res => {
        ctx.body = '删除成功！'
    }).catch(err => {
        console.log(err);
    })
})


module.exports = router;
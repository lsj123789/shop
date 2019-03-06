const Router = require('koa-router')
let router = new Router()
const mongoose = require('mongoose')

router.post('/setAddress', async (ctx) => {
    let Address = mongoose.model('Address')
    let newAddress = new Address(ctx.request.body)
    await newAddress.save().then(() => {
        ctx.body = {
            code: 200,
            message: '保存地址信息成功'
        }
    }).catch(err => {
        console.log(err);
        ctx.body = {
            code: 500,
            message: '保存地址信息失败'
        }
    })
})

router.get('/getAddress', async (ctx) => {
    const Address = mongoose.model('Address')
    await Address.find().populate('userName').exec().then(res => {
        ctx.body = res
    }).catch(err => {
        console.log(err);
    })
})







module.exports = router
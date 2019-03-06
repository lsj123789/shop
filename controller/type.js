const Koa = require('koa');
const Router = require('koa-router');
const mongoose = require('mongoose');
const fs = require('fs');

let router = new Router();

router.get('/insertType', async (ctx) => {
    fs.readFile('./data/type.json', 'utf8', (err, data) => {
        data = JSON.parse(data);
        let count = 0;
        const Type = mongoose.model('Type');
        data.map((value, index) => {
            console.log(value);
            let type = new Type(value);
            type.save().then(() => {
                count++;
                console.log('成功保存类型数据' + count + '条！');
            }).catch(err => {
                console.log('保存失败' + err);
            });
        })
    })
    ctx.body = '导入类型数据'
})


router.get('/getTypes',async(ctx) => {
    const type = mongoose.model('Type')
    await type.find({}).exec().then(res=>{
      ctx.body = res;
    }).catch(err=>{
        console.log(err);
    })
})

module.exports = router;
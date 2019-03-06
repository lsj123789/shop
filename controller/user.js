const Router = require('koa-router');
let router = new Router();
const mongoose = require('mongoose');

//注册
router.post('/registeUser', async (ctx) => {
    //获取model
    const User = mongoose.model('User');//User就是User.js中发布模型时 使用的名字
    let newUser = new User(ctx.request.body);//接受post请求 封装成user对象
    await newUser.save().then(() => {//使用mongoose下的save方法 保存用户注册信息 
        ctx.body = {
            code: 200,
            message: '注册成功！'
        };
    }).catch(err => {
        ctx.body = {
            code: 500,
            message: err
        };
    })
})//user控制器下的registeUser方法

//登录
router.post('/loginUser', async (ctx) => {
    let loginUser = ctx.request.body;//接收前端发送来的数据
    let userName = loginUser.userName;
    let password = loginUser.password;
    const User = mongoose.model('User');//引入model
    //查询用户名是否存在 再去比对密码
    await User.findOne({ userName: userName }).exec().then(async (result) => {
        if (result) {
            let newUser = new User();
            await newUser.comparePassword(password, result.password)//password是前端传过来的login.password，result是一个对象 result.password是userName比对成功下的password
                .then(isMatch => {
                    if (isMatch) {//isMatch为true 登录成功
                        ctx.body = {
                            code: 200,
                            message: '登录成功！',
                            userInfo: result.userName,
                        }
                    } else {//isMatch为false 登录失败
                        ctx.body = {
                            code: 201,
                            message: '用户名错误，请重新输入！'
                        }
                    }
                })
        } else {
            ctx.body = {
                code: 201,
                messsage: '用户名不存在，请先注册后再登录!'
            }
        }
    })

})



module.exports = router;
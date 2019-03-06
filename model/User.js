const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcryptjs = require('bcryptjs');

//创建Schema模型 对应的就是mongodb数据库中的集合 模型里的每一个属性就是mongodb中每一条数据的key 就是键值
const userSchema = new Schema({
    userId: Schema.Types.ObjectId,//Schema下的唯一标识id
    userName: {
        unique: true,//unique表示用户名唯一
        type: String,
    },
    password: String,
    createDate: { type: Date, default: Date.now() },//default表示默认时间 是系统当前时间
})

//对用户注册密码进行加盐加密
userSchema.pre('save', function (next) {//每次调用save（）之前 调用next（）//不能用箭头函数 因为箭头函数里面没有this
    bcryptjs.genSalt(10, (err, salt) => {//随机生成一个迭代次数为10的盐
        if (err) return next(err);
        bcryptjs.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;//如果成功的话 生成的hash赋给password
            next();
        })
    });
})


//在模型下定义一个方法 对用户输入的密码和加盐加密后的密码进行比对 如果相等isMatch返回true 不相等返回false
userSchema.methods = {
    comparePassword: (_password, password) => {
        return new Promise((resolve, reject) => {
            bcryptjs.compare(_password, password, (err, isMatch) => {
                if (!err) resolve(isMatch)
                else reject(err)
            })
        })
    }
}



//发布模型  使用的就是userSchema
mongoose.model('User', userSchema);//User对应的就是userSchema这个模型
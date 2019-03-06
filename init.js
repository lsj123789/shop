const mongoose = require('mongoose');
const db = 'mongodb://localhost/shop';


//引入Schema模型
const glob = require('glob');
const path = require('path');
exports.initSchemas = ()=>{//导出模型
    glob.sync(path.resolve(__dirname,'./model','*.js')).forEach(require);//引入所有Schema 把当前项目下所有的js文件都引入进来
};



exports.connect =()=>{
    //连接数据库
     mongoose.connect(db,{useNewUrlParser:true});
     //监听数据库连接
     mongoose.connection.on('disconnected',()=>{//数据库连接失败时
         mongoose.connect(db);//重新连接数据库
     });
     //数据库出现错误
     mongoose.connection.on('error',err=>{
         console.log(err);
         mongoose.connect(db);
     });
     //连接的时候
     mongoose.connection.once('open',()=>{
         console.log('mongodb connected successfully!');
     })
}
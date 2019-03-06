const mongoose = require('mongoose')
const Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const cartSchema = new Schema({
    ID: ObjectId,
    productId: {//多集合关联查询：通过cart集合里的productId查询product集合里的商品详细信息
        type: ObjectId,
        ref: 'Product'//ref是关联的意思  指向联合查询的model
    },
    userId: ObjectId,
    createDate: { type: Date, default: Date.now() }
})

mongoose.model('Cart', cartSchema)
const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    id:String,
    name:String,
    tel:String,
    address:String,
    userName:{
        type:String,
        ref:'User'
    }
})

mongoose.model('Address',AddressSchema)
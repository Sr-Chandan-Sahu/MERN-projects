const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name:String,
    price:Number,
    category:String,
    company:String,
    userId:String,
})

module.exports = mongoose.model('products', productSchema);
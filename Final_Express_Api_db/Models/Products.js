const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    productType_id: {
        type: Number,
        required: true
    },
    min_price:{
        type:Number,
        required:true
    },
    brand_id:{
        type:Number,
        required:true
    }
   /* _id:{
        type:Number,
        required:true
    }*/
})
module.exports = mongoose.model('product', productsSchema, 'products');
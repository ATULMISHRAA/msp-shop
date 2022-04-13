const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    productId:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('items',ItemSchema,'items');
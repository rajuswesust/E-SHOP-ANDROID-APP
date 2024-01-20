const mongoose = require('mongoose'); //database
const{Schema} = mongoose;

const orderItemSchema = mongoose.Schema({
    quantity : {
        type : Number,
        required : true
    },
    productId : {
        type : Schema.Types.ObjectId,
        ref : 'Product'
    }
  
})

const OrderItem = mongoose.model('OrderItem', orderItemSchema);

module.exports = OrderItem;
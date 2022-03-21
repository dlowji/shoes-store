const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
    order_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
    },
    shoe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('OrderDetail',OrderDetailSchema)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Shoe",
    },
    quantity: {
        type: Number,
        required: true,
        min: [1, 'Quantity can not be less than 1.'],
    },
    price: {
        type: Number,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    }
}, {
    timestamps: true
})

const CartSchema = new Schema({
    items: [ItemSchema],
    subTotal: {
        default: 0,
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Cart', CartSchema);

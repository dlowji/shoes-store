const Cart = require('../../models/Cart');

exports.cart = async () => {
    const carts = await Cart.find().populate({
        path: 'items.productId',
        select: 'name price total',
    });
    return carts;
}

exports.addItem = async payload => {
    const newItem = await Cart.create(payload);
    return newItem;
}

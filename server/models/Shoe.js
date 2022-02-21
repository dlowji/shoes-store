const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema({
    name: { type: String, required: true },
    price: {type: Number, required: true},
    imgUrl: {type: String, required: true},
    brand: {type: String, required: true},
    code: {type: String, required: true},
    desc: {type: String, required: true},
}, {
    timestamps: true
})

module.exports = mongoose.model('Shoe',ShoeSchema)

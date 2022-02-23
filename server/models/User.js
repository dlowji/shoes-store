const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        min: 8,
        max: 30
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 500
    },
    email: {
        type: String,
        required: true,
        max: 50,
        min: 8
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema);

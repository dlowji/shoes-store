const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoleSchema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    desc: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Role',RoleSchema)

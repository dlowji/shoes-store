const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ShoeSchema = new Schema(
	{
		name: {
			type: String,
			required: true,
			min: 8,
		},
		price: {
			type: Number,
			required: true,
		},
		imgUrl: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		star: {
			type: Number,
			required: true,
		},
		desc: {
			type: String,
			required: true,
		},
		size: {
			type: Array,
			required: true,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model('Shoe', ShoeSchema);

const Shoe = require('../models/Shoe')
const { errorMessage, successMessage } = require('../utils/helpers/responseMessage');

class ProductController {
    // [GET] /products
    async index(req, res, next) {
        await Shoe.find({})
            .then(data => {
                return successMessage(res, data, 'Get products successfully')
            })
            .catch(err => {
                return errorMessage(res, 500, 'Cannot get products');
            })
            
    }
    
    // [GET] /products/:id
    async detail(req, res, next) {
        if (!(req.params.id)) return errorMessage(res, 500, 'Forgot id of product');

        await Shoe.findById(req.params.id)
            .then(data => {
                return successMessage(res, data, 'Get product successfully');
            })
            .catch(err => {
                return errorMessage(res, 500, 'Cannot get this product');
            })
    }

    // [GET] /products/limit/:quantity
    async limit(req, res, next) {
        console.log(req.params)
        if (!(req.params.quantity)) return errorMessage(res, 500, 'Invalid limit number');

        await Shoe.find({}).limit(req.params.quantity)
            .then(data => {
                return successMessage(res, data, 'Get amount of products successfully');
            })
            .catch(err => {
                return errorMessage(res, 500, err.message);
            })
    }
}

module.exports = new ProductController;

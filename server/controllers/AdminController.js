const { productValidate } = require('../utils/helpers/validate');
const { errorMessage, successMessage } = require('../utils/helpers/responseMessage');
const { uploadImage } = require('../utils/middleware/uploadImage');
const Shoe = require('../models/Shoe')

class AdminController {
    //[POST] /admin/product/create
    async createProduct(req, res) {
        const { error } = productValidate(req.body);
        if (error) return errorMessage(res, 500, error.details[0].message);

        const product = new Shoe({
            name: req.body.name,
            price: req.body.price,
            imgUrl: uploadImage(),
            brand: req.body.brand,
            code: req.body.code,
            desc: req.body.desc,
            size: ['8.5US', '9US', '9.5US']
        });

        try {
            const createdProduct = await product.create();
            return successMessage(res, createdProduct, 'Add new product successfully');
        } catch (error) {
            return errorMessage(res, 500, error.message);
        }
    }

    //[PUT] /admin/product/update/:id
    async updateProduct(req, res) {
        const filter = {_id: req.params.id};
        const update = {
            name: req.body.name,
            price: req.body.price,
            imgUrl: uploadImage(),
            brand: req.body.brand,
            code: req.body.code,
            desc: req.body.desc,
            size: ['8.5US', '9US', '9.5US']
        }

        //doc is the document before update was applied if not add new: true
        await Shoe.findOneAndUpdate(filter, update, {
            new: true,
        })
            .then(doc => {
                successMessage(res, doc, 'Update product successfully');
            })
            .catch(error => {
                errorMessage(res, 500, 'Error updating product' + error.message);
            }) 
    }

    //[DELETE] /admin/product/delete/:id
    async deleteProduct(req, res) {
        const filter = {_id: req.params.id};
        await Shoe.deleteOne(filter)
            .then(deletedCount => {
                successMessage(res, deletedCount, 'Delete product successfully');
            })
            .catch(error => {
                errorMessage(res, 500, 'Error deleting product: ' + error.message);
            })
    }

    //[POST] /admin/user/create
    createUser(req, res) {
        const { error } = productValidate(req.body);
        if (error) return errorMessage(res, 500, error.details[0].message);

        const product = new Shoe({
            name: req.body.name,
            price: req.body.price,
            imgUrl: uploadImage(),
            brand: req.body.brand,
            code: req.body.code,
            desc: req.body.desc,
            size: ['8.5US', '9US', '9.5US']
        });

        try {
            const createdProduct = await product.create();
            return successMessage(res, createdProduct, 'Add new product successfully');
        } catch (error) {
            return errorMessage(res, 500, error.message);
        }
    }

    //[PUT] /admin/user/update/:id
    updateUser(req, res) {
        const filter = {_id: req.params.id};
        const update = {
            name: req.body.name,
            price: req.body.price,
            imgUrl: uploadImage(),
            brand: req.body.brand,
            code: req.body.code,
            desc: req.body.desc,
            size: ['8.5US', '9US', '9.5US']
        }

        //doc is the document before update was applied if not add new: true
        await Shoe.findOneAndUpdate(filter, update, {
            new: true,
        })
            .then(doc => {
                successMessage(res, doc, 'Update product successfully');
            })
            .catch(error => {
                errorMessage(res, 500, 'Error updating product' + error.message);
            }) 
    }

    //[DELETE] /admin/user/delete/:id
    deleteUser(req, res) {
        const filter = {_id: req.params.id};
        await Shoe.deleteOne(filter)
            .then(deletedCount => {
                successMessage(res, deletedCount, 'Delete product successfully');
            })
            .catch(error => {
                errorMessage(res, 500, 'Error deleting product: ' + error.message);
            })
    }
}

module.exports = new AdminController;

const { productValidate, userValidate } = require('../utils/helpers/validate');
const { errorMessage, successMessage } = require('../utils/helpers/responseMessage');
const Shoe = require('../models/Shoe')

const multer = require('multer');
const path = require('path');
// Set Storage Engine
const storage = multer.diskStorage({
	destination: './public/uploads/',
	filename: function(req, file, cb){
	  cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});

// Init Upload
const upload = multer({
	storage: storage,
	limits:{fileSize: 1000000},
	fileFilter: function(req, file, cb){
	  checkFileType(file, cb);
	}
}).single('imageProduct');

// Check File Type
function checkFileType(file, cb){
	// Allowed ext
	const filetypes = /jpeg|jpg|png|gif/;
	// Check ext
	const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
	// Check mime
	const mimetype = filetypes.test(file.mimetype);
  
	if(mimetype && extname){
	  return cb(null,true);
	} else {
	  cb('Error: Images Only!');
	}
}

class AdminController {
    //[POST] /admin/product/create
    createProduct(req, res) {
        upload(req, res, async (err) => {
            if(err) return errorMessage(res, 500, err);
            else {
                if (req.file == undefined) {
                    return errorMessage(res, 500, 'Error: No File Selected!');
                } 
                else {
                    const validData = {
                        nameProduct: req.body.nameProduct,
                        brandProduct: req.body.brandProduct,
                        priceProduct: req.body.priceProduct,
                        descriptionProduct: req.body.descriptionProduct,
                    }

                    const { error } = productValidate(validData);
                    if (error) return errorMessage(res, 500, error.details[0].message);

                    const product = {
                        name: validData.nameProduct,
                        price: parseInt(validData.priceProduct),
                        imgUrl: `/uploads/${req.file.filename}`,
                        brand: validData.brandProduct,
                        code: 'DLOWJ1',
                        desc: validData.descriptionProduct,
                        size: ['8.5US', '9US', '9.5US'],
                    };

                    try {
                        const createdProduct = await Shoe.create(product);
                        return successMessage(res, createdProduct, 'Add new product successfully');
                    } catch (error) {
                        return errorMessage(res, 500, error.message);
                    }
                }
            }
        });    
    }

    //[PUT] /admin/product/update/:id
    async updateProduct(req, res) {
        upload(req, res, async (err) => {
            if(err) return errorMessage(res, 500, err);
            else {
                if (req.file == undefined) {
                    return errorMessage(res, 500, 'Error: No File Selected!');
                } 
                else {
                    const validData = {
                        nameProduct: req.body.nameProduct,
                        brandProduct: req.body.brandProduct,
                        priceProduct: req.body.priceProduct,
                        descriptionProduct: req.body.descriptionProduct,
                    }

                    const { error } = productValidate(validData);
                    if (error) return errorMessage(res, 500, error.details[0].message);

                    const filter = {_id: req.params.id};
                    const update = {
                        name: validData.nameProduct,
                        price: parseInt(validData.priceProduct),
                        imgUrl: `/uploads/${req.file.filename}`,
                        brand: validData.brandProduct,
                        code: 'DLOWJ1',
                        desc: validData.descriptionProduct,
                        size: ['8.5US', '9US', '9.5US'],
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
            }
        });    
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
    async createUser(req, res) {
        // upload(req, res, async (err) => {
        //     if(err) return errorMessage(res, 500, err);
        //     else {
        //         if (req.file == undefined) {
        //             return errorMessage(res, 500, 'Error: No File Selected!');
        //         } 
        //         else {
        //             const validData = {
        //                 nameProduct: req.body.nameProduct,
        //                 brandProduct: req.body.brandProduct,
        //                 priceProduct: req.body.priceProduct,
        //                 descriptionProduct: req.body.descriptionProduct,
        //             }

        //             const { error } = productValidate(validData);
        //             if (error) return errorMessage(res, 500, error.details[0].message);

        //             const product = {
        //                 name: validData.nameProduct,
        //                 price: parseInt(validData.priceProduct),
        //                 imgUrl: `/uploads/${req.file.filename}`,
        //                 brand: validData.brandProduct,
        //                 code: 'DLOWJ1',
        //                 desc: validData.descriptionProduct,
        //                 size: ['8.5US', '9US', '9.5US'],
        //             };

        //             try {
        //                 const createdProduct = await Shoe.create(product);
        //                 return successMessage(res, createdProduct, 'Add new product successfully');
        //             } catch (error) {
        //                 return errorMessage(res, 500, error.message);
        //             }
        //         }
        //     }
        // }); 
    }

    //[PUT] /admin/user/update/:id
    async updateUser(req, res) {
        // upload(req, res, async (err) => {
        //     if(err) return errorMessage(res, 500, err);
        //     else {
        //         if (req.file == undefined) {
        //             return errorMessage(res, 500, 'Error: No File Selected!');
        //         } 
        //         else {
        //             const validData = {
        //                 nameProduct: req.body.nameProduct,
        //                 brandProduct: req.body.brandProduct,
        //                 priceProduct: req.body.priceProduct,
        //                 descriptionProduct: req.body.descriptionProduct,
        //             }

        //             const { error } = productValidate(validData);
        //             if (error) return errorMessage(res, 500, error.details[0].message);

        //             const filter = {_id: req.params.id};
        //             const update = {
        //                 name: validData.nameProduct,
        //                 price: parseInt(validData.priceProduct),
        //                 imgUrl: `/uploads/${req.file.filename}`,
        //                 brand: validData.brandProduct,
        //                 code: 'DLOWJ1',
        //                 desc: validData.descriptionProduct,
        //                 size: ['8.5US', '9US', '9.5US'],
        //             }

        //             //doc is the document before update was applied if not add new: true
        //             await Shoe.findOneAndUpdate(filter, update, {
        //                 new: true,
        //             })
        //                 .then(doc => {
        //                     successMessage(res, doc, 'Update user successfully');
        //                 })
        //                 .catch(error => {
        //                     errorMessage(res, 500, 'Error updating user' + error.message);
        //                 }) 
        //         }
        //     }
        // });
    }

    //[DELETE] /admin/user/delete/:id
    async deleteUser(req, res) {
        const filter = {_id: req.params.id};
        await Shoe.deleteOne(filter)
            .then(deletedCount => {
                successMessage(res, deletedCount, 'Delete user successfully');
            })
            .catch(error => {
                errorMessage(res, 500, 'Error deleting user: ' + error.message);
            })
    }
}

module.exports = new AdminController;

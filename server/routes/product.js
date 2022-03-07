const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

//[GET] products/:id
router.get('/:id', productController.detail);

//[GET] products/limit/:quantity
router.get('/limit/:quantity', productController.limit);

//[GET] products/
router.get('/', productController.index);


module.exports = router;
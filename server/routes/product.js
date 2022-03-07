const express = require('express');
const router = express.Router();
const productController = require('../controllers/ProductController');

router.get('/:id', productController.detail);
router.get('/limit/:quantity', productController.limit);
router.get('/', productController.index);


module.exports = router;
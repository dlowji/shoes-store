const express = require('express');
const router = express.Router();
const adminController = require('../controllers/AdminController');

router.post('/product/create', adminController.createProduct);
router.put('/product/update/:id', adminController.updateProduct);
router.delete('/product/delete/:id', adminController.deleteProduct);
router.post('/user/create', adminController.createUser);
router.put('/user/update/:id', adminController.updateUser);
router.delete('/user/delete/:id', adminController.deleteUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const siteController = require('../controllers/SiteController');

router.get('/search/brand/:brand', siteController.searchByBrand);
router.get('/search/name/:name', siteController.searchByName);
router.get('/', siteController.index);

module.exports = router;

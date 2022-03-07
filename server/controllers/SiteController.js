const { errorMessage, successMessage } = require('../utils/helpers/responseMessage');
const Shoe = require('../models/Shoe');

class SiteController {
    
    // [GET] /search/brand/:brand
    async searchByBrand(req, res) {
        if (!(req.params.brand)) return errorMessage(res, 500, 'Invalid brand');

        await Shoe.find({
            brand: {
                $regex: new RegExp(req.params.brand, 'i'),
                // $option: 'i'
            }
        })
            .then(data => {
                return successMessage(res, data, 'Get products by brand successfully');
            })
            .catch(err => errorMessage(res, 500, err.message));
    }

    // [GET] /
    index(req, res) {
        res.send('home');
    }
}

module.exports = new SiteController;

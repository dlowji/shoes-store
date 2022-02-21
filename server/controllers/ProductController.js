const Shoe = require('../models/Shoe')

class ProductController {
    // [GET] /product
    index(req, res, next) {
        Shoe.find({})
            .then(shoes => res.json(shoes))
            .catch(next)
            
    }
}

module.exports = new ProductController;

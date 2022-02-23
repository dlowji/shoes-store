const Shoe = require('../models/Shoe')

class ProductController {
    // [GET] /product
    async index(req, res, next) {
        await Shoe.find({})
            .then(shoes => res.json(shoes))
            .catch(err => {
                return res.status(500).send('Cannot get products')
            })
            
    }
}

module.exports = new ProductController;

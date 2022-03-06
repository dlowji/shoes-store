const siteRouter = require('./site');
const productRouter = require('./product');
const authRouter = require('./auth');
const cors = require('cors');

function route(app) {
    
    app.use('/products', cors(),  productRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);

}

module.exports = route;

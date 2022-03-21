const siteRouter = require('./site');
const productRouter = require('./product');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const cartRouter = require('./cart');

function route(app) {
    
    app.use('/products',  productRouter);
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/cart', cartRouter);
    app.use('/', siteRouter);

}

module.exports = route;

const siteRouter = require('./site');
const productRouter = require('./product');
const authRouter = require('./auth');
const adminRouter = require('./admin');

function route(app) {
    
    app.use('/products',  productRouter);
    app.use('/auth', authRouter);
    app.use('/admin', adminRouter);
    app.use('/', siteRouter);

}

module.exports = route;

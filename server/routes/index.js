const siteRouter = require('./site');
const productRouter = require('./product');
const authRouter = require('./auth');

function route(app) {
    
    app.use('/products', productRouter);
    app.use('/auth', authRouter);
    app.use('/', siteRouter);

}

module.exports = route;

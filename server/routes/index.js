const siteRouter = require('./site');
const productRouter = require('./product');
const authRouter = require('./auth');
const adminRouter = require('./admin');
const cors = require('cors');

function route(app) {
    
    app.use('/products', cors(),  productRouter);
    app.use('/auth', cors(), authRouter);
    app.use('/admin', cors(), adminRouter);
    app.use('/', cors(), siteRouter);

}

module.exports = route;

const siteRouter = require('./site');
const productRouter = require('./product');
const authRouter = require('./auth');
const cors = require('cors');

function route(app) {
<<<<<<< HEAD
	app.use('/products', cors(), productRouter);
	app.use('/auth', authRouter);
	app.use('/', siteRouter);
=======
    
    app.use('/products', cors(),  productRouter);
    app.use('/auth', cors(), authRouter);
    app.use('/', cors(), siteRouter);

>>>>>>> 633799bbede7d3f201f59b89a5d668e0e00cfe73
}

module.exports = route;

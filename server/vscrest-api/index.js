const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('../routes/index');
const db = require('../config/db');
const path = require('path');
const app = express();
const Joi = require('joi');

//Load config
dotenv.config({
    path: `${__dirname}/.env`
})

//Morgan
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

//JSON Body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 3333;


//Set path for static file
app.use(express.static(path.join(__dirname, 'public')));

//Connect database
db.connect();

//Routes init
route(app);

app.listen(PORT,() => {
    console.log(`App is listening on http://localhost:${PORT}`);
})

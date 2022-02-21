const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const path = require('path');
const app = express();

//Load config
dotenv.config({
    path: `${__dirname}/config/config.env`
})

const PORT = process.env.PORT || 3333;


//Set path for static file
app.use(express.static(path.join(__dirname, 'public')));


//Set template engine
app.engine('hbs', engine({
    extname: ".hbs"
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//Connect database
db.connect();

//Routes init
route(app);

app.listen(PORT,() => {
    console.log(`App is listening on http://localhost:${PORT}`);
})

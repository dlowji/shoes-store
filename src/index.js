const path = require('path');
const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const route = require('./routes');
const db = require('./config/db');
const app = express();
const port = 3000;

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

app.listen(port,() => {
    console.log(`App is listening on http://localhost:${port}`);
})

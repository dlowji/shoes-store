const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb+srv://admin:12345@cluster0.fstou.mongodb.net/Shoe?retryWrites=true&w=majority', {
            useNewURLParser: true,
            useUnifiedTopology: true
        });
        console.log('Connect to database successfully');
    }
    catch(err) {
        console.log('Error connecting to database');
    }
}

module.exports = { connect };

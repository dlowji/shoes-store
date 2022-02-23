const { registerValidate, loginValidate } = require('../utils/helpers/validate');
const { errorMessage, successMessage } = require('../utils/helpers/responseMessage');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthController {
    async register(req, res) {
        //VALIDATE
        const { error } = registerValidate(req.body);
        if (error) return errorMessage(res, 500, error.details[0].message);

        //Check exist account
        const existUsername = await User.findOne({ username: req.body.username });
        if (existUsername) return res.status(500).send('Username has already used by another user');

        const existEmail = await User.findOne({ email: req.body.email });
        if (existEmail) return res.status(500).send('Email has already used by another user');

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        const user = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
        })

        try {
            const savedUser = await user.save();
            res.json(savedUser._id);
        } catch (err) {
            res.status(500).send(err);
        }

    }
    
    async login(req, res) {
        //VALIDATE 
        const { error } = loginValidate(req.body);
        if (error) return res.status(500).send(error.details[0].message);

        //Check exist account
        const existAccount = await User.findOne({ username: req.body.username });
        if (!existAccount) return res.status(500).send('Wrong username or password');

        //Detect password
        const validPass = await bcrypt.compare(req.body.password, existAccount.password);
        if (!validPass) return res.status(500).send('Wrong username or password');

        res.json('Logged')

    }
}

module.exports = new AuthController;

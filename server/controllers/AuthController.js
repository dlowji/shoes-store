const { registerValidate, loginValidate } = require('../utils/helpers/validate');
const { errorMessage, successMessage } = require('../utils/helpers/responseMessage');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

class AuthController {
	async register(req, res) {
		//VALIDATE
		const { error } = registerValidate(req.body);
		if (error)
			return res.json({
				code: 500,
				message: error.details[0].message,
			});

		//Check exist account
		const existUsername = await User.findOne({ username: req.body.username });
		if (existUsername)
			return res.json({
				code: 500,
				error: 'username',
				message: 'Username has already used by another user',
			});

		const existEmail = await User.findOne({ email: req.body.email });
		if (existEmail)
			return res.json({
				code: 500,
				error: 'email',
				message: 'Email has already used by another user',
			});

		//Hash password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		//Create a new user
		const user = new User({
			username: req.body.username,
			password: hashedPassword,
			email: req.body.email,
			photoURL: '/uploads/default.jpg',
			role: 'User',
		});

		try {
			const savedUser = await user.save();
			successMessage(res, savedUser, 'User created successfully');
		} catch (err) {
			console.log(err);
			errorMessage(res, 500, err.message);
		}
	}

	async login(req, res) {
		//VALIDATE
		const { error } = loginValidate(req.body);
		if (error) return res.json({
			code: 500,
			message: error.details[0].message,
		})

		//Check exist account
		const existAccount = await User.findOne({ username: req.body.username });
		if (!existAccount) return res.json({
			code: 500,
			error: 'username',
			message: 'This account is not registered'
		})

		//Detect password
		const validPass = await bcrypt.compare(req.body.password, existAccount.password);
		if (!validPass) return res.json({
			code: 500,
			error: 'password',
			message: 'Wrong password'
		})

		//Create and assign a token
		const token = jwt.sign({ _id: existAccount._id }, process.env.TOKEN_SECRET);
		res.header('auth-token', token).json({
			code: 0,
			data: existAccount,
			message: 'Login successfully',
		});
	}
}

module.exports = new AuthController();

const Joi = require('joi');

const registerValidate = user => {
    const schema = Joi.object({
        username: Joi.string().min(8).max(32).required(),
        password: Joi.string().min(8).max(32).required(),
        email: Joi.string().min(8).max(60).required().email(),
    })

    return schema.validate(user);
}

const loginValidate = user => {
    const schema = Joi.object({
        username: Joi.string().min(8).max(32).required(),
        password: Joi.string().min(8).max(32).required(),
    })
    return schema.validate(user);
}

module.exports = { registerValidate, loginValidate };

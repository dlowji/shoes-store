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

const productValidate = product => {
    const schema = Joi.object({
        name: Joi.string().min(8).max(32).required(),
        price: Joi.number().required(),
        brand: Joi.string().required(),
        code: Joi.string().required(),
        desc: Joi.string().required(),
        size: Joi.array().required(),
    })
    return schema.validate(product);
}

module.exports = { registerValidate, loginValidate, productValidate };

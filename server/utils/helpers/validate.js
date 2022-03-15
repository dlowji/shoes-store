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
        nameProduct: Joi.string().min(8).required(),
        brandProduct: Joi.string().required(),
        priceProduct: Joi.number().required(),
        descriptionProduct: Joi.string().required(),
    })
    return schema.validate(product);
}

const userValidate = user => {
    return;
}

module.exports = { registerValidate, loginValidate, productValidate };

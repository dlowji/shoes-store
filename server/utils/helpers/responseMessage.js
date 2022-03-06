const errorMessage = (res, code, message) => {
    return res.status(code).send(message);
}

const successMessage = (res, data, message) => {
    return res.json({
        code: 0,
        data,
        message
    })
}

module.exports = { errorMessage, successMessage };

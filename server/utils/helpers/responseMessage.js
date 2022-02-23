const errorMessage = (res, code, message) => {
    return res.status(code).send(message);
}

const successMessage = (res, data, message) => {
    return res.json({
        data,
        message
    })
}

module.exports = { errorMessage, successMessage };

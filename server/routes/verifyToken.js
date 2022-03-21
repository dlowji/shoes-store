const jwt = require('jsonwebtoken');
const {errorMessage, successMessage} = require('../utils/helpers/responseMessage');

module.exports = function (req, res, next) {
    const token = req.header('auth-token');
    if (!token) return errorMessage(res, 401, 'Access denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        console.log(verified)
        req.user = verified;
        next();
    } catch (error) {
        return errorMessage(res, 400, 'Invalid token')
    }
}

const { UnauthenticatedError } = require('../errors')
const jwt = require('jsonwebtoken')

const authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer')) {
        throw new UnauthenticatedError('Authentication error')
    }
    const token = authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        const {userId,name } = payload
        req.user = { userId, name}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication error')
    }
}


module.exports = authentication
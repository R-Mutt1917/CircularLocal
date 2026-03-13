const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    return hash
}

const checkPassword = async (password, hash) => {
    return await bcrypt.compare(password, hash)
}

const generateJWT = (id, rol) => {
    const payload = { id, rol }
    const token = jwt.sign(payload, secret, { expiresIn: '1d' })
    return token
}

module.exports = {
    hashPassword,
    checkPassword,
    generateJWT
}

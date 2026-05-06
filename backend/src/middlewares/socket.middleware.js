const jwt = require('jsonwebtoken');
const { User } = require('../models');

const verifyTokenSocket = async (token) => {
    if (!token) {
        throw new Error("No token");
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user || user.activo == 0) {
        throw new Error("Usuario inválido");
    }

    return decoded;
};

module.exports = { verifyTokenSocket };
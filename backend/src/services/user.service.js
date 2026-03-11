// auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

const register = async (username, password) => {
    const exists = await User.findOne({ where: { username } });
    if (exists) throw new Error('El nombre de usuario ya está registrado');

    const hash = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        password: hash,
        rol: 'ACTOR',
        fecha_registro: new Date(),
        activo: true
    });
    return user;
};

const login = async (username, password) => {
    const user = await User.findOne({ where: { username } });
    if (!user) throw new Error('Usuario no encontrado');

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) throw new Error('Contraseña incorrecta');

    const token = jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return token;
};

module.exports = { register, login }
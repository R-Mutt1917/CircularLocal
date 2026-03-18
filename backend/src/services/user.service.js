// auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');
const { User } = require('../models');
const { createProfile, updateProfile } = require('./perfil.service');

const register = async (username, password) => {
    const exists = await User.findOne({ where: { username } });
    if (exists) throw new Error('El nombre de usuario ya está registrado');

    const hash = await bcrypt.hash(password, 10);

    // Crea el usuario
    const user = await User.create({
        username,
        password: hash,
        rol: 'ACTOR',
        fecha_registro: new Date(),
        activo: true
    });

    // Crea el perfil vacio
    await createProfile(user.id);

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

const updateUserWithProfile = async (userId, userData, profileData) => {
    const t = await sequelize.transaction();

    try {
        if (userData.username) {
            const exists = await User.findOne({
                where: { username: userData.username },
                transaction: t
            });
            if (exists && exists.id !== userId) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            await User.update({ username: userData.username }, {
                where: { id: userId },
                transaction: t
            });
        }

        if (profileData) {
            // updateProfile implementacion pendiente en perfil.service.js
        }

        await t.commit();

        return await User.findByPk(userId, {
            include: ['perfil']
        });
    } catch (error) {
        await t.rollback();
        throw error;
    }
};

module.exports = { register, login, updateUserWithProfile }

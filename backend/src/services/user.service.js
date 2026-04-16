// auth.service.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sequelize } = require('../config/database');
const { User, Perfil } = require('../models');
const { createProfile, putPerfil } = require('./perfil.service');

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

    if (user.activo == 0) {
        throw new Error('El usuario está baneado');
    }

    const token = jwt.sign(
        { id: user.id, username: user.username, role: user.rol, name: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );

    return { token, role: user.rol, id: user.id, username: user.username };
};

const updateUserWithProfile = async (userId, userData, profileData) => {

    const transaction = await sequelize.transaction();
    try {
        if (userData.username) {

            const userIdNum = parseInt(userId);

            const exists = await User.findOne({
                where: { username: userData.username },
                transaction
            });
            if (exists && exists.id !== userIdNum) {
                throw new Error('El nombre de usuario ya está en uso');
            }
            await User.update({ ...userData }, {
                where: { id: userId },
                transaction
            });
        }

        if (profileData) {
            await putPerfil(userId,profileData,transaction)
        }
        await transaction.commit();

        return await User.findByPk(userId, {
            include: [{ model: Perfil, as: 'perfil' }]
        });
    } catch (error) {
        await transaction.rollback();
        throw error;

    }
};

// Baja logica del usuario
const deleteUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    if (!user.activo) {
        throw new Error("El usuario ya está dado de baja");
    }

    user.activo = false;
    await user.save();

    return user;
}




module.exports = { register, login, updateUserWithProfile, deleteUser }

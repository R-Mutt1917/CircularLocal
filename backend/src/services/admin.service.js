const { User, Perfil } = require('../models');

const banUser = async (userId, adminId) => {
    if (adminId === userId) {
        throw new Error("No puedes banearte a ti mismo");
    }

    const user = await User.findByPk(userId);
    if (!user) return null;

    if (!user.activo) {
        throw new Error("El usuario ya está dado de baja");
    }

    user.activo = false;
    await user.save();

    return user;
}

const getUsers = async (page, limit) => {
    // Calcula el offset
    const offset = (page - 1) * limit;

    const users = await User.findAndCountAll({
        offset,
        limit: parseInt(limit),
        order: [['fecha_registro', 'DESC']], // Ordena por fecha de registro descendente
        include: [
            {
                model: Perfil,
                as: 'perfil',
                attributes: ['id', 'nombre_perfil', 'imagen', 'email', 'tipo_actor']
            }
        ]
    });

    return users;
}

module.exports = {
    banUser,
    getUsers,
};

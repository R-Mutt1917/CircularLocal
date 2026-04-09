const { User, Publicacion, Perfil } = require('../models');

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

// Obtiene las publicaciones reportadas con paginación
const getPublicacionReportadas = async (page, limit) => {
    // Calcula el offset
    const offset = (page - 1) * limit;

    const publicaciones = await Publicacion.findAndCountAll({
        offset,
        limit: parseInt(limit),
        where: { reportada: 1 },
        attributes: ['id', 'titulo', 'tipo', 'createdAt'],
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id'],
                include: [
                    {
                        model: Perfil,
                        as: 'perfil',
                        attributes: ['nombre_perfil', 'imagen']
                    }
                ]
            }
        ],
        order: [['createdAt', 'DESC']] // Ordena por fecha de registro descendente
    });

    return publicaciones;
}

module.exports = { banUser, getPublicacionReportadas }

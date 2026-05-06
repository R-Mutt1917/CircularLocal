const { User, Publicacion, Perfil, MetricaImpacto } = require('../models');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors/app.errors');

const banUser = async (userId, adminId) => {
    if (adminId === userId) {
        throw new BadRequestError("No puedes banearte a ti mismo");
    }

    const user = await User.findByPk(userId);
    if (!user) throw new NotFoundError("Usuario no encontrado");

    if (!user.activo) {
        throw new ConflictError("El usuario ya está dado de baja");
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

const cancelar = async (publicacionId) => {
    const publicacion = await Publicacion.findByPk(publicacionId);
    if (!publicacion) throw new NotFoundError("Publicacion no encontrada");

    publicacion.estado = 'Cancelada';
    publicacion.reportada = 0;
    await publicacion.save();

    return publicacion;
}

const getMetricas = async () => {
    const metricas = await MetricaImpacto.findAll();
    if (!metricas) throw new NotFoundError("Metricas no encontradas");;
    return metricas;
}

module.exports = {
    banUser,
    getUsers,
    getPublicacionReportadas,
    cancelar,
    getMetricas,
};

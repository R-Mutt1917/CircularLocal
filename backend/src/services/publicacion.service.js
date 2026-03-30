const { Publicacion } = require('../models');

const getByUser = async (userId, limit) => {
    const publicaciones = await Publicacion.findAll({
        where: { user_id: userId },
        ...(limit && { limit: parseInt(limit) }),
    });

    if (publicaciones.length === 0) {
        throw new Error('No se encontraron publicaciones para el usuario');
    }

    return publicaciones
}

module.exports = { getByUser }

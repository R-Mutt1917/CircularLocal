const { Publicacion } = require('../models');

const getByUser = async (userId) => {
    try {
        const publicaciones = await Publicacion.findAll({
            where: { user_id: userId },
        });

        if (!publicaciones) {
            throw new Error('No se encontraron publicaciones para el usuario');
        }

        return publicaciones
    } catch (error) {
        throw error;
    }
}

module.exports = { getByUser }

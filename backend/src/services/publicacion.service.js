const { Publicacion, User, Perfil, Tag } = require('../models');

const getByUser = async (userId, limit) => {
    const publicaciones = await Publicacion.findAll({
        where: { user_id: userId },
        include: [{ model: Tag, as: 'tag' }],
        ...(limit && { limit: parseInt(limit) }),
    });

    return publicaciones || [];
}

const getPublicacionDetalle = async (publicacionId) => {
    const publicacion = await Publicacion.findByPk(publicacionId, {
        include: [
            { model: Tag, as: 'tag' },
            {
                model: User,
                as: 'user',
                attributes: ['id'],
                include: [
                    { model: Perfil, as: 'perfil' }
                ]
            }
        ]
    });

    if (!publicacion) {
        throw new Error('Publicacion no encontrada');
    }

    return publicacion;
};


const getPreviewPublicaciones = async () => {
    const publicaciones = await Publicacion.findAll({
        attributes: ['id', 'titulo', 'tipo', 'tagId', 'user_id', 'createdAt'],
        include: [
            { model: Tag, as: 'tag' },
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
        ]
    });

    return publicaciones || [];
}


module.exports = { getByUser, getPublicacionDetalle, getPreviewPublicaciones }


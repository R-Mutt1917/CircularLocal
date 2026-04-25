const { Publicacion, User, Perfil, Tag, Material, Producto, Servicio } = require('../models');
const { NotFoundError, ConflictError } = require('../errors/app.errors');

const crearPublicacion = async (data) => {
    const { tipo, detalle, tagId, ...pubData } = data;

    const t = await Publicacion.sequelize.transaction();

    try {
        // Verificar que el tag exista
        const tag = await Tag.findByPk(tagId);
        if (!tag) {
            throw new NotFoundError('El tipo de material (tag) no existe.');
        }

        // Crear publicación base
        const publicacion = await Publicacion.create(
            { ...pubData, tipo, tagId },
            { transaction: t }
        );

        // Crear subtipo
        if (tipo === 'MATERIAL') {
            await Material.create({
                ...detalle,
                publicacionId: publicacion.id
            }, { transaction: t });
        } else if (tipo === 'PRODUCTO') {
            await Producto.create({
                ...detalle,
                publicacionId: publicacion.id
            }, { transaction: t });
        } else if (tipo === 'SERVICIO') {
            await Servicio.create({
                ...detalle,
                publicacionId: publicacion.id
            }, { transaction: t });
        }

        await t.commit();

        return await Publicacion.findByPk(publicacion.id, {
            include: [Material, Producto, Servicio]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

const activarPublicacion = async (id) => {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new NotFoundError('Publicación no encontrada');
    publicacion.estado = 'Publicada';
    return await publicacion.save();
};

const finalizarPublicacion = async (id) => {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new NotFoundError('Publicación no encontrada');
    publicacion.estado = 'Finalizada';
    return await publicacion.save();
}

const cancelarPublicacion = async (id) => {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new NotFoundError('Publicación no encontrada');
    publicacion.estado = 'Cancelada';
    return await publicacion.save();
}

const editarPublicacion = async (id, data) => {
    const { detalle, tipo, ...pubData } = data;

    const t = await Publicacion.sequelize.transaction();

    try {
        const publicacion = await Publicacion.findByPk(id, {
            include: [Material, Producto, Servicio],
            transaction: t
        });

        if (!publicacion) {
            await t.rollback();
            throw new NotFoundError("Publicacion no encontrada");
        }

        // Actualiza la base
        await publicacion.update(
            {
                ...pubData,
                //fechaActualizacion: new Date()
            },
            { transaction: t }
        );

        // Actualiza el tipo especifico
        if (detalle) {
            if (publicacion.tipo === 'MATERIAL' && publicacion.Material) {
                await publicacion.Material.update(detalle, { transaction: t });
            }

            if (publicacion.tipo === 'PRODUCTO' && publicacion.Producto) {
                await publicacion.Producto.update(detalle, { transaction: t });
            }

            if (publicacion.tipo === 'SERVICIO' && publicacion.Servicio) {
                await publicacion.Servicio.update(detalle, { transaction: t });
            }
        }

        await t.commit();

        return await Publicacion.findByPk(publicacion.id, {
            include: [Material, Producto, Servicio]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const obtenerPublicacionesPaginadas = async (page, limit) => {
    // Calcular el offset y el límite
    const offset = (page - 1) * limit;

    const publicaciones = await Publicacion.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
      include: [Material, Producto, Servicio, { model: Tag, as: 'tag' }]
    });

    return publicaciones;
}

const obtenerPublicacion = async (id) => {
    const publicacion = await Publicacion.findByPk(id, {
        include: [Material, Producto, Servicio, { model: Tag, as: 'tag' }]
    });
    if (!publicacion) {
        throw new NotFoundError('Publicación no encontrada');
    }
    return publicacion;
};

const obtenerTags = async () => {
    const tags = await Tag.findAll();
    return tags;
}

const getByUser = async (userId, limit) => {
    const publicaciones = await Publicacion.findAll({
        where: { user_id: userId },
        include: [{ model: Tag, as: 'tag' }, Material, Producto, Servicio],
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
            },
            Material,
            Producto,
            Servicio
        ]
    });

    if (!publicacion) {
        throw new NotFoundError('Publicacion no encontrada');
    }

    return publicacion;
};


const getPreviewPublicaciones = async () => {
    const publicaciones = await Publicacion.findAll({
        where: { estado: 'Publicada' },
        attributes: ['id', 'user_id', 'titulo', 'descripcion', 'imagen', 'estado', 'verificada', 'reportada', 'tipo', 'tagId', 'createdAt'],
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
            },
            Material,
            Producto,
            Servicio
        ]
    });

    return publicaciones || [];
}

const reportar = async (id) => {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new NotFoundError('Publicación no encontrada');

    if (publicacion.verificada) {
        throw new ConflictError('La publicacion esta verificada, no puede ser reportada');
    }

    publicacion.reportada = true;
    await publicacion.save();

    return { message: 'Publicación reportada correctamente' };
}

const eliminar = async (id) => {
    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) throw new NotFoundError('Publicación no encontrada');

    await publicacion.destroy();

    return { message: 'Publicación eliminada correctamente' };
}


module.exports = {
    crearPublicacion,
    activarPublicacion,
    finalizarPublicacion,
    cancelarPublicacion,
    editarPublicacion,
    obtenerPublicacionesPaginadas,
    obtenerPublicacion,
    obtenerTags,
    getByUser,
    getPublicacionDetalle,
    getPreviewPublicaciones,
    reportar,
    eliminar
};

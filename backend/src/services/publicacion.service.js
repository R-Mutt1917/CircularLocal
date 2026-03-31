const { Publicacion } = require('../models');
const Material = require('../models/material.model');
const Producto = require('../models/producto.model');
const Servicio = require('../models/servicio.model');

const crearPublicacion = async (data) => {
    const { tipo, detalle, ...pubData } = data;

    const t = await Publicacion.sequelize.transaction();

    try {
        // 1. Crear publicación base
        const publicacion = await Publicacion.create(
            { ...pubData, tipo },
            { transaction: t }
        );

        // 2. Crear subtipo
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
            include: [ Material, Producto, Servicio ]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
}

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

module.exports = { getByUser, crearPublicacion }

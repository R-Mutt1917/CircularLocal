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
            return null;
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
            include: [ Material, Producto, Servicio ]
        });

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const getByUser = async (userId, limit) => {
    const publicaciones = await Publicacion.findAll({
        where: { user_id: userId },
        ...(limit && { limit: parseInt(limit) }),
        include: [ Material, Producto, Servicio ]
    });

    if (publicaciones.length === 0) {
        throw new Error('No se encontraron publicaciones para el usuario');
    }

    return publicaciones
}

module.exports = {
    getByUser,
    crearPublicacion,
    editarPublicacion,
};

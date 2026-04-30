const { Intercambio, Solicitud, Publicacion, Material, Producto, Servicio, Conversacion, ConversacionesUsuarios } = require('../models');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors/app.errors');
const metricaImpactoService = require('../services/metricaImpacto.service');
const conversacionService = require('./conversacion.service');

const crearIntercambio = async (solicitudId, solicitanteId, publicadorId) => {
    const t = await Intercambio.sequelize.transaction();

    try {
        // Crea el Intercambio
        const intercambio = await Intercambio.create(
            {
                solicitudId,
                estadoIntercambio: 'EN_PROCESO'
            },
            { transaction: t }
        );

        // Crea la Conversación asociada
        const conversacion = await Conversacion.create(
            {
                intercambioId: intercambio.id,
                ultimoMensaje: '',
                fechaActualizacion: new Date()
            },
            { transaction: t }
        );

        // Asocia los usuarios usuarios
        await ConversacionesUsuarios.bulkCreate(
            [
                { conversationId: conversacion.id, userId: solicitanteId },
                { conversationId: conversacion.id, userId: publicadorId }
            ],
            { transaction: t }
        );

        await t.commit();

        return intercambio;

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

const confirmarIntercambio = async (intercambioId, userId) => {
    const intercambio = await Intercambio.findByPk(intercambioId, {
        include: [
            {
                model: Solicitud,
                as: 'solicitud',
                attributes: ['id', 'solicitanteId'],
                include: [
                    {
                        model: Publicacion,
                        as: 'publicacion',
                        attributes: ['id', 'user_id', 'tipo'],
                        include: [
                            { model: Material },
                            { model: Producto },
                            { model: Servicio }
                        ]
                    }
                ]
            }
        ]
    });

    if (!intercambio) throw new NotFoundError("Intercambio no encontrado");

    if (intercambio.estadoIntercambio !== 'EN_PROCESO') {
        throw new ConflictError("No se puede confirmar este intercambio");
    };

    // Verifica quien esta confirmando el intercambio
    if (userId == intercambio.solicitud.solicitanteId) {
        await intercambio.update({ confirmadoSolicitante: true }); // confirma el solicitante
    } else {
        if (userId == intercambio.solicitud.publicacion.user_id) {
            await intercambio.update({ confirmadoPublicador: true }); // confirma el publicador
        } else {
            throw new BadRequestError("No puedes confirmar este intercambio");
        }
    };

    if (intercambio.confirmadoSolicitante && intercambio.confirmadoPublicador) {

        const fecha = new Date();

        // Actualiza el estado del Intercambio a COMPLETADO
        await intercambio.update({ estadoIntercambio: 'COMPLETADO', fechaCierre: fecha });

        // Actualiza las Metricas de Impacto
        const periodoActual = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
        const publicacion = intercambio.solicitud.publicacion;

        let cantidadReutilizada = 0;

        if (publicacion.tipo === 'MATERIAL') {
            cantidadReutilizada = publicacion.Material?.cantidad || 0;
        }

        if (publicacion.tipo === 'PRODUCTO') {
            cantidadReutilizada = publicacion.Producto?.cantidad || 0;
        }

        await Promise.all([
            metricaImpactoService.actualizarMetricaPorPeriodo('global', cantidadReutilizada, fecha),
            metricaImpactoService.actualizarMetricaPorPeriodo(periodoActual, cantidadReutilizada, fecha)
        ]);
    }

    return intercambio;
}

const cancelarIntercambio = async (intercambioId, userId) => {
    const intercambio = await Intercambio.findByPk(intercambioId, {
        include: [
            {
                model: Solicitud,
                as: 'solicitud',
                attributes: ['id', 'solicitanteId'],
                include: [
                    {
                        model: Publicacion,
                        as: 'publicacion',
                        attributes: ['id', 'user_id']
                    }
                ]
            }
        ]
    });

    if (!intercambio) throw new NotFoundError("Intercambio no encontrado");

    if (intercambio.estadoIntercambio !== 'EN_PROCESO') {
        throw new ConflictError("No se puede cancelar este intercambio");
    };

    // Valida quien esta cancelando el intercambio
    if (userId == intercambio.solicitud.solicitanteId || userId == intercambio.solicitud.publicacion.user_id) {
        await intercambio.update({ estadoIntercambio: 'CANCELADO' });
    } else {
        throw new BadRequestError("No puedes cancelar este intercambio");
    };

    return intercambio;
}

const obtenerIntercambiosCompletados = async (userId) => {
    const cantidad = await Intercambio.count({
        where: {
            estadoIntercambio: 'COMPLETADO'
        },
        include: [
            {
                model: Solicitud,
                as: 'solicitud',
                attributes: [],
                required: true,
                include: [
                    {
                        model: Publicacion,
                        as: 'publicacion',
                        attributes: [],
                        where: { user_id: userId },
                        required: true
                    }
                ]
            }
        ]
    });

    return cantidad;
};

module.exports = {
    crearIntercambio,
    confirmarIntercambio,
    cancelarIntercambio,
    obtenerIntercambiosCompletados,
};

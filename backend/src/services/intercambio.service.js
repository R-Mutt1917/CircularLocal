const { Intercambio, Solicitud, Publicacion } = require('../models');

const crearIntercambio = async (solicitudId) => {
    return await Intercambio.create({
        solicitudId: solicitudId,
        estadoIntercambio: 'EN_PROCESO',
    });
}

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
                        attributes: ['id', 'user_id']
                    }
                ]
            }
        ]
    });

    if (!intercambio) return null;

    if (intercambio.estadoIntercambio !== 'EN_PROCESO') {
        throw new Error("No se puede confirmar este intercambio");
    };

    // Verifica quien esta confirmando el intercambio
    if (userId == intercambio.solicitud.solicitanteId) {
        await intercambio.update({ confirmadoSolicitante: true }); // confirma el solicitante
    } else {
        if (userId == intercambio.solicitud.publicacion.user_id) {
            await intercambio.update({ confirmadoPublicador: true }); // confirma el publicador
        } else {
            throw new Error("No puedes confirmar este intercambio");
        }
    };

    if (intercambio.confirmadoSolicitante && intercambio.confirmadoPublicador) {
        await intercambio.update({ estadoIntercambio: 'COMPLETADO' });
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

    if (!intercambio) return null;

    if (intercambio.estadoIntercambio !== 'EN_PROCESO') {
        throw new Error("No se puede cancelar este intercambio");
    };

    // Valida quien esta cancelando el intercambio
    if (userId == intercambio.solicitud.solicitanteId || userId == intercambio.solicitud.publicacion.user_id) {
        await intercambio.update({ estadoIntercambio: 'CANCELADO' });
    } else {
        throw new Error("No puedes cancelar este intercambio");
    };

    return intercambio;
}

module.exports = {
    crearIntercambio,
    confirmarIntercambio,
    cancelarIntercambio,
};

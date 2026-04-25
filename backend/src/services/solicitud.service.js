const { Solicitud, Publicacion, User } = require('../models');
const { NotFoundError, BadRequestError, ConflictError } = require('../errors/app.errors');
const intercambioService = require('./intercambio.service');

const crearSolicitud = async (publicacionId, solicitanteId, mensajeInicial) => {

    const publicacion = await Publicacion.findByPk(publicacionId);

    if (!publicacion) {
        throw new NotFoundError('Publicacion no encontrada');
    }

    // Valida que el usuario que hizo la Solicitud no sea el mismo que hizo la Publicacion
    if (solicitanteId == publicacion.user_id) {
        throw new BadRequestError('No puedes solicitar tu publicacion');
    }

    const solicitudPendiente = await Solicitud.findOne({
        where: {
            publicacionId,
            solicitanteId,
            estadoSolicitud: 'PENDIENTE'
        }
    });

    if (solicitudPendiente) {
        throw new ConflictError('Ya tenés una solicitud pendiente para esta publicación');
    }

    // Crea la Solicitud
    const solicitud = await Solicitud.create({
        publicacionId: publicacionId,
        mensajeInicial: mensajeInicial,
        estadoSolicitud: 'PENDIENTE',
        solicitanteId: solicitanteId,
    });

    return solicitud;
}

const obtenerSolicitudesPendientes = async (userId) => {
    return await Solicitud.findAll({
        where: { estadoSolicitud: 'PENDIENTE' },
        include: [
            {
                model: Publicacion,
                as: 'publicacion',
                where: { user_id: userId },
                attributes: ['id', 'titulo', 'imagen']
            },
            {
                model: User,
                as: 'solicitante',
                attributes: ['id', 'username']
            }
        ],
        order: [['createdAt', 'DESC']]
    });
};

const rechazarSolicitud = async (solicitudId) => {
    const solicitud = await Solicitud.findByPk(solicitudId);
    if (!solicitud) throw new NotFoundError("Solicitud no encontrada");

    // Solo las solicitudes Pendientes se puede rechazar
    if (solicitud.estadoSolicitud !== 'PENDIENTE') {
        throw new ConflictError("No se puede rechazar esta solicitud");
    }

    solicitud.update({ estadoSolicitud: 'RECHAZADA' });

    return solicitud;
}

const cancelarSolicitud = async (solicitudId) => {
    const solicitud = await Solicitud.findByPk(solicitudId);
    if (!solicitud) throw new NotFoundError("Solicitud no encontrada");

    if (solicitud.estadoSolicitud === 'CANCELADA') {
        throw new ConflictError("Esta solicitud ya esta Cancelada");
    }

    solicitud.update({ estadoSolicitud: 'CANCELADA' });

    return solicitud;
}

const aceptarSolicitud = async (solicitudId) => {
    const solicitud = await Solicitud.findByPk(solicitudId);
    if (!solicitud) throw new NotFoundError("Solicitud no encontrada");

    // Solo las solicitudes Pendientes se puede aceptar
    if (solicitud.estadoSolicitud !== 'PENDIENTE') {
        throw new ConflictError("No se puede aceptar esta solicitud");
    }

    // Actualiza es estado de la Solicitud
    await solicitud.update({ estadoSolicitud: 'ACEPTADA' });

    // Crea el Intercambio
    await intercambioService.crearIntercambio(solicitudId);

    return solicitud;
}

const obtenerSolicitudesEnviadas = async (userId) => {
    const solicitudes = await Solicitud.findAll({
        where: { solicitanteId: userId },
        include: [
            {
                model: Publicacion,
                as: 'publicacion',
                attributes: ['id', 'titulo', 'imagen'],
                include: [{
                    model: User,
                    as: 'user', // dueño de la publicación
                    attributes: ['username']
                }]
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    return solicitudes;
};


module.exports = {
    crearSolicitud,
    rechazarSolicitud,
    cancelarSolicitud,
    aceptarSolicitud,
    obtenerSolicitudesPendientes,
    obtenerSolicitudesEnviadas,
}

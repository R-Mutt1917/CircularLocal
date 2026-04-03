const { Solicitud, Publicacion } = require('../models');

const crearSolicitud = async (publicacionId, solicitanteId, mensajeInicial) => {

    const publicacion = await Publicacion.findByPk(publicacionId);

    // Valida que el usuario que hizo la Solicitud no sea el mismo que hizo la Publicacion
    if (solicitanteId == publicacion.user_id) {
        throw new Error('No se pudo crear la Solicitud');
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

const rechazarSolicitud = async (solicitudId) => {
    const solicitud = await Solicitud.findByPk(solicitudId);
    if (!solicitud) return null;

    // Solo las solicitudes Pendientes se puede rechazar
    if (solicitud.estadoSolicitud !== 'PENDIENTE') {
        throw new Error("No se puede rechazar esta solicitud");
    }

    solicitud.update({ estadoSolicitud: 'RECHAZADA' });

    return solicitud;
}

const cancelarSolicitud = async (solicitudId) => {
    const solicitud = await Solicitud.findByPk(solicitudId);
    if (!solicitud) return null;

    if (solicitud.estadoSolicitud === 'CANCELADA') {
        throw new Error("Esta solicitud ya esta Cancelada");
    }

    solicitud.update({ estadoSolicitud: 'CANCELADA' });

    return solicitud;
}

const aceptarSolicitud = async (solicitudId) => {
    const solicitud = await Solicitud.findByPk(solicitudId);
    if (!solicitud) return null;

    // Solo las solicitudes Pendientes se puede aceptar
    if (solicitud.estadoSolicitud !== 'PENDIENTE') {
        throw new Error("No se puede aceptar esta solicitud");
    }

    solicitud.update({ estadoSolicitud: 'ACEPTADA' });

    return solicitud;
}

module.exports = {
    crearSolicitud,
    rechazarSolicitud,
    cancelarSolicitud,
    aceptarSolicitud,
}

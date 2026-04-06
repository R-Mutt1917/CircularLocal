function toSolicitudDTO(solicitud) {
    if (!solicitud) return null;
    return {
        publicacionId: solicitud.publicacionId,
        solicitanteId: solicitud.solicitanteId,
        mensajeInicial: solicitud.mensajeInicial,
        estadoSolicitud: solicitud.estadoSolicitud,
        fechaCreacion: solicitud.fechaCreacion,
    };
}

const toListSolicitudesPendientesDTO = (solicitudes) => {
    return solicitudes.map((solicitud) => ({
        solicitudId: solicitud.id,
        tituloPublicacion: solicitud.publicacion.titulo,
        solicitante: solicitud.solicitante.username,
        //imagen: solicitud.publicacion.imagenPrincipal,
        mensaje: solicitud.mensajeInicial,
        estado: solicitud.estadoSolicitud,
        fecha: solicitud.fechaCreacion
    }));
};

module.exports = {
    toSolicitudDTO,
    toListSolicitudesPendientesDTO,
};
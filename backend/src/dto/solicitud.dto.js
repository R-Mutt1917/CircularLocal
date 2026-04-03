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

module.exports = {
    toSolicitudDTO,
};
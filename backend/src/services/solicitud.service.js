const { Solicitud, Publicacion, User } = require('../models');

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

const obtenerSolicitudesPendientes = async (userId) => {
    return await Solicitud.findAll({
        where: { estadoSolicitud: 'PENDIENTE' },
        include: [
            {
                model: Publicacion,
                as: 'publicacion',
                where: { user_id: userId },
                attributes: ['id', 'titulo'] // Agregar imagenPrincipal
            },
            {
                model: User,
                as: 'solicitante',
                attributes: ['id', 'username']
            }
        ]
    });
};

module.exports = {
    crearSolicitud,
    obtenerSolicitudesPendientes,
}

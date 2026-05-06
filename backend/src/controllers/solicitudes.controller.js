const solicitudService = require('../services/solicitud.service');
const { toSolicitudDTO, toListSolicitudesPendientesDTO, toListSolicitudesEnviadasDTO } = require('../dto/solicitud.dto');

const crearSolicitud = async (req, res, next) => {
    try {
        const { publicacionId, mensajeInicial } = req.body;
        const solicitanteId = req.user.id;

        const solicitud = await solicitudService.crearSolicitud(publicacionId, solicitanteId, mensajeInicial);

        res.status(201).json(toSolicitudDTO(solicitud));
    } catch (error) {
        next(error);
    }
};

const obtenerSolicitudesPendientes = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const solicitudes = await solicitudService.obtenerSolicitudesPendientes(userId);

        res.status(200).json(toListSolicitudesPendientesDTO(solicitudes));
    } catch (error) {
        next(error);
    }
};

const rechazarSolicitud = async (req, res, next) => {
    const solicitudId = parseInt(req.params.id);
    if (isNaN(solicitudId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const solicitud = await solicitudService.rechazarSolicitud(solicitudId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const cancelarSolicitud = async (req, res, next) => {
    const solicitudId = parseInt(req.params.id);
    if (isNaN(solicitudId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const solicitud = await solicitudService.cancelarSolicitud(solicitudId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const aceptarSolicitud = async (req, res, next) => {
    const solicitudId = parseInt(req.params.id);
    if (isNaN(solicitudId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const solicitud = await solicitudService.aceptarSolicitud(solicitudId);

        res.status(204).send();
    } catch (error) {
        next(error);
    }
}

const obtenerSolicitudesEnviadas = async (req, res, next) => {
    const userId = req.user.id;

    try {
        const solicitudes = await solicitudService.obtenerSolicitudesEnviadas(userId);

        res.status(200).json(toListSolicitudesEnviadasDTO(solicitudes));
    } catch (error) {
        next(error);
    }
}

module.exports = {
    crearSolicitud,
    rechazarSolicitud,
    cancelarSolicitud,
    aceptarSolicitud,
    obtenerSolicitudesPendientes,
    obtenerSolicitudesEnviadas,
};
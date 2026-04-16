const solicitudService = require('../services/solicitud.service');
const { toSolicitudDTO, toListSolicitudesPendientesDTO } = require('../dto/solicitud.dto');

const crearSolicitud = async (req, res) => {
    try {
        const { publicacionId, mensajeInicial } = req.body;
        const solicitanteId = req.user.id;

        const solicitud = await solicitudService.crearSolicitud(publicacionId, solicitanteId, mensajeInicial);

        res.status(201).json(toSolicitudDTO(solicitud));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const obtenerSolicitudesPendientes = async (req, res) => {
    try {
        const userId = req.user.id;

        const solicitudes = await solicitudService.obtenerSolicitudesPendientes(userId);

        res.status(200).json(toListSolicitudesPendientesDTO(solicitudes));
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const rechazarSolicitud = async (req, res) => {
    const solicitudId = parseInt(req.params.id);
    if (isNaN(solicitudId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const solicitud = await solicitudService.rechazarSolicitud(solicitudId);
        if (!solicitud) {
            return res.status(404).json({
                error: "Solicitud no encontrada"
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const cancelarSolicitud = async (req, res) => {
    const solicitudId = parseInt(req.params.id);
    if (isNaN(solicitudId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const solicitud = await solicitudService.cancelarSolicitud(solicitudId);
        if (!solicitud) {
            return res.status(404).json({
                error: "Solicitud no encontrada"
            });
        }

        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

const aceptarSolicitud = async (req, res) => {
    const solicitudId = parseInt(req.params.id);
    if (isNaN(solicitudId)) {
        return res.status(400).json({ message: 'ID inválido' });
    }
    try {
        const resultado = await solicitudService.aceptarSolicitud(solicitudId);
        if (!resultado) {
            return res.status(404).json({ error: 'Solicitud no encontrada' });
        }
        // Devolvemos el conversacionId para que el frontend redirija al chat
        res.status(200).json({ conversacionId: resultado.conversacionId });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    crearSolicitud,
    rechazarSolicitud,
    cancelarSolicitud,
    aceptarSolicitud,
    obtenerSolicitudesPendientes,
};
const solicitudService = require('../services/solicitud.service');
const { toSolicitudDTO } = require('../dto/solicitud.dto');

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

module.exports = {
    crearSolicitud,
    rechazarSolicitud,
    cancelarSolicitud,
};
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
}

module.exports = { 
    crearSolicitud,
    obtenerSolicitudesPendientes,
 };
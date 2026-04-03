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

module.exports = { 
    crearSolicitud,
 };
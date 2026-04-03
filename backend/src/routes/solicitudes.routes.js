const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudes.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta para crear una solicitud
router.post('/', verifyToken, solicitudesController.crearSolicitud);

// Ruta para rechazar una solicitud
router.patch('/:id/rechazar', verifyToken, solicitudesController.rechazarSolicitud);

// Ruta para cancelar solicitud
router.patch('/:id/cancelar', verifyToken, solicitudesController.cancelarSolicitud);

// Ruta para aceptar solicitud
router.patch('/:id/aceptar', verifyToken, solicitudesController.aceptarSolicitud);

module.exports = router;
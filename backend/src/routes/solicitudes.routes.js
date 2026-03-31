const express = require('express');
const router = express.Router();
const solicitudesController = require('../controllers/solicitudes.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta para crear una solicitud
router.post('/', verifyToken, solicitudesController.crearSolicitud);

module.exports = router;
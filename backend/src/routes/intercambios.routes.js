const express = require('express');
const router = express.Router();
const intercambioController = require('../controllers/intercambios.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta para confirmar un intercambio
router.patch('/:id/confirmar', verifyToken, intercambioController.confirmarIntercambio);

module.exports = router;
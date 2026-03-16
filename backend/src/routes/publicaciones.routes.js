const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones.controller');

// Ruta para crear una nueva publicación
router.post('/publicaciones', publicacionesController.crearPublicacion);

// Ruta para publicar una publicación (cambiar estado a 'publicada')
router.put('/publicaciones/:id/publicar', publicacionesController.publicarPublicacion);

// Ruta para finalizar una publicación (cambiar estado a 'finalizada')
router.put('/publicaciones/:id/finalizar', publicacionesController.finalizarPublicacion);

// Ruta para cancelar una publicación (cambiar estado a 'cancelada')
router.put('/publicaciones/:id/cancelar', publicacionesController.cancelarPublicacion);

module.exports = router;
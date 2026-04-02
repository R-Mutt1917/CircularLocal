const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones.controller');

// Ruta para crear una nueva publicación
router.post('/', publicacionesController.crearPublicacion);

// Ruta para publicar una publicación (cambiar estado a 'publicada')
router.put('/:id/publicar', publicacionesController.publicarPublicacion);

// Ruta para finalizar una publicación (cambiar estado a 'finalizada')
router.put('/:id/finalizar', publicacionesController.finalizarPublicacion);

// Ruta para cancelar una publicación (cambiar estado a 'cancelada')
router.put('/:id/cancelar', publicacionesController.cancelarPublicacion);

// Ruta para editar una publicación existente (actualizar detalles sin cambiar estado)
router.put('/:id', publicacionesController.editarPublicacion);

// Ruta para consultar publicaciones con paginación
router.get('/', publicacionesController.consultarPublicaciones);

// Ruta para consultar el detalle de una publicación
router.get('/:id', publicacionesController.consultarDetallePublicacion);

// Ruta para listar todos los tags
router.get('/tags', publicacionesController.listarTags);

// Ruta para asociar un tag a una publicación 
router.post('/:id/tags', publicacionesController.asociarTags);

// Ruta para eliminar un tag de una publicación
router.delete('/:id/tags', publicacionesController.eliminarTag);

router.get('/user/:id', publicacionesController.getPublicacionesByUser)


module.exports = router;
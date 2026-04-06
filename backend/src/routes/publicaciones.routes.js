const express = require('express');
const router = express.Router();
const publicacionesController = require('../controllers/publicaciones.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Ruta para crear una nueva publicación (protegida)
router.post('/', verifyToken, publicacionesController.crearPublicacion);

// Ruta para publicar una publicación (cambiar estado a 'publicada') (protegida)
router.put('/:id/publicar', verifyToken, publicacionesController.publicarPublicacion);

// Ruta para finalizar una publicación (cambiar estado a 'finalizada') (protegida)
router.put('/:id/finalizar', verifyToken, publicacionesController.finalizarPublicacion);

// Ruta para cancelar una publicación (cambiar estado a 'cancelada') (protegida)
router.put('/:id/cancelar', verifyToken, publicacionesController.cancelarPublicacion);

// Ruta para editar una publicación existente (actualizar detalles sin cambiar estado) (protegida)
router.put('/:id', verifyToken, publicacionesController.editarPublicacion);

// Ruta para consultar publicaciones con paginación
router.get('/', publicacionesController.consultarPublicaciones);

// Ruta para listar todos los tags
router.get('/tags', publicacionesController.listarTags);

// RUTA PARA OBTENER PREVISUALIZACION DE PUBLICACIONES
router.get('/preview', publicacionesController.getPreviewPublicaciones);

// Ruta para consultar el detalle de una publicación
router.get('/:id', publicacionesController.consultarDetallePublicacion);

// Ruta para asociar un tag a una publicación (protegida)
router.post('/:id/tags', verifyToken, publicacionesController.asociarTags);

// Ruta para eliminar un tag de una publicación (protegida)
router.delete('/:id/tags', verifyToken, publicacionesController.eliminarTag);

router.get('/user/:id', publicacionesController.getPublicacionesByUser)

// RUTA PARA OBTENER PUBLICACION CON PERFIL
router.get('/perfil/:id', publicacionesController.getPublicacionDetalle);

module.exports = router;

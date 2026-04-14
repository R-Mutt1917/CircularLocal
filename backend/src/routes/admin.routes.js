const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middlewares/admin.middleware');

// Ruta para obtener las publicaciones reportadas
router.get('/publicaciones/reportadas', verifyAdmin, adminController.getPublicacionReportadas);

// Ruta para cancelar una publicación
router.patch('/publicaciones/:id/cancelar', verifyAdmin, adminController.cancelarPublicacion);

// Ruta para obtener la lista de usuarios paginados
router.get('/usuarios', verifyAdmin, adminController.obtenerUsuarios);

router.patch('/usuarios/:id/ban', verifyAdmin, adminController.banearUsuario);

// Ruta para obtener las metricas de impacto
router.get('/metricas', verifyAdmin, adminController.obtenerMetricas);

module.exports = router;
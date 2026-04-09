const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middlewares/admin.middleware');

// Ruta para obtener las publicaciones reportadas
router.get('/publicaciones/reportadas', verifyAdmin, adminController.getPublicacionReportadas);

// Ruta para obtener la lista de usuarios paginados
router.get('/usuarios', verifyAdmin, adminController.obtenerUsuarios);

router.patch('/usuarios/:id/ban', verifyAdmin, adminController.banearUsuario);

module.exports = router;
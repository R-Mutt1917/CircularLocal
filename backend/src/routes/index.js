const router = require('express').Router();
const authRoutes = require('./auth.routes');
const usuarioRoutes = require('./usuario.routes');
const perfilRoutes = require('./perfil.routes');
const publicacionesRoutes = require('./publicaciones.routes');
const adminRoutes = require('./admin.routes');
const solicitudesRoutes = require('./solicitudes.routes');
const intercambiosRoutes = require('./intercambios.routes');

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/perfil', perfilRoutes);
router.use('/publicaciones', publicacionesRoutes);
router.use('/admin', adminRoutes);
router.use('/solicitudes', solicitudesRoutes);
router.use('/intercambios', intercambiosRoutes);

module.exports = router;
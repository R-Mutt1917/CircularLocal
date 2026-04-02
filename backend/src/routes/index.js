const router = require('express').Router();
const authRoutes = require('./auth.routes');
const usuarioRoutes = require('./usuario.routes');
const perfilRoutes = require('./perfil.routes');
const publicacionesRoutes = require('./publicaciones.routes');
const adminRoutes = require('./admin.routes');

router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);
router.use('/perfil', perfilRoutes);
router.use('/publicaciones', publicacionesRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
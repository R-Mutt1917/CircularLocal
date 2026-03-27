const router = require('express').Router();
const authRoutes = require('./auth.routes');
const perfilRoutes = require('./perfil.routes');
const publicacionesRoutes = require('./publicaciones.routes');

router.use('/auth', authRoutes);
router.use('/perfil', perfilRoutes);
router.use('/publicaciones', publicacionesRoutes);

module.exports = router;
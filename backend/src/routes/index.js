const router = require('express').Router();
const authRoutes = require('./auth.routes');
const perfilRoutes = require('./perfil.routes');

router.use('/auth', authRoutes);
router.use('/perfil', perfilRoutes);

module.exports = router;
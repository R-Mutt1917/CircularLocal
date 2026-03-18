const router = require('express').Router();
const authRoutes = require('./auth.routes');
const usuarioRoutes = require('./usuario.routes');


router.use('/auth', authRoutes);
router.use('/usuarios', usuarioRoutes);


module.exports = router;
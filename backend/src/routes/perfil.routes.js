const router = require('express').Router();
const perfilController = require('../controllers/perfil.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/:id', verifyToken, perfilController.getPerfil);

module.exports = router;
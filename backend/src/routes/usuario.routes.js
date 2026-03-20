const router = require('express').Router();
const usuarioController = require('../controllers/usuario.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.put('/:id', verifyToken, usuarioController.updateUser);

module.exports = router;

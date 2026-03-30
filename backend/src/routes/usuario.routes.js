const router = require('express').Router();
const usuarioController = require('../controllers/usuario.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.put('/:id', verifyToken, usuarioController.updateUser);
router.delete('/:id', verifyToken, usuarioController.deleteUser);
router.put('/perfil/:id', verifyToken, usuarioController.updateUserWithProfile);

module.exports = router;

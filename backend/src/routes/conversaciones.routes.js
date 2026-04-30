const router = require('express').Router();
const conversacionController = require('../controllers/conversacion.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

router.get('/', verifyToken, conversacionController.getUserConversations);
router.get('/:id/mensajes', verifyToken, conversacionController.getMessages);

module.exports = router;
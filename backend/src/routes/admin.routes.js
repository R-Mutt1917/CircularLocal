const router = require('express').Router();
const adminController = require('../controllers/admin.controller');
const { verifyAdmin } = require('../middlewares/admin.middleware');

router.patch('/usuarios/:id/ban', verifyAdmin, adminController.banearUsuario);

module.exports = router;
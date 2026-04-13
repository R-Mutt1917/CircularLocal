const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controller');

router.post('/start', chatController.startConversation);
router.get('/:conversationId', chatController.getMessages);
router.post('/:conversationId/send', chatController.sendMessage);

module.exports = router;
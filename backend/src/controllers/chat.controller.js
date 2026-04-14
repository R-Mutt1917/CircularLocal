const chatService = require('../services/chat.service');

exports.startConversation = async (req, res) => {
  try {
    const conversation = await chatService.startConversation(req.body);
    res.status(201).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await chatService.getMessages(req.params.conversationId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const message = await chatService.sendMessage(req.params.conversationId, req.body);
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
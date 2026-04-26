const conversacionService = require('../services/conversacion.service');
const mensajeService = require('../services/mensaje.service');

const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.query;
    const conversations = await conversacionService.getUserConversations(userId);
    res.json(conversations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrGetConversation = async (req, res) => {
  try {
    const { userIdA, userIdB } = req.body;

    let conversation = await conversacionService.findBetweenUsers(userIdA, userIdB);
    if (!conversation) {
      conversation = await conversacionService.createConversacion(userIdA, userIdB);
    }

    res.json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getMessages = async (req, res) => {
  try {
    const { id } = req.params;
    const { limit = 50, offset = 0 } = req.query;
    const messages = await mensajeService.findByConversation(id, limit, offset);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getUserConversations, createOrGetConversation, getMessages };
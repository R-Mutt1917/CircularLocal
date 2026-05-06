const conversacionService = require('../services/conversacion.service');
const mensajeService = require('../services/mensaje.service');
const { toUserConversationsDTO } = require('../dto/conversacion.dto');

const getUserConversations = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const conversations = await conversacionService.getUserConversations(userId);
    res.status(200).json(toUserConversationsDTO(conversations));
  } catch (error) {
    next(error);
  }
};

const getMessages = async (req, res, next) => {
  try {
    const coversacionId = parseInt(req.params.id);

    if (isNaN(coversacionId)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const mensajes = await mensajeService.findByConversation(coversacionId);
    res.status(200).json(mensajes);
  } catch (error) {
    next(error);
  }
};

module.exports = { getUserConversations, getMessages };
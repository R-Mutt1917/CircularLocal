const Conversacion = require('../models/conversacion.model');
const Mensaje = require('../models/mensaje.model');

exports.startConversation = async ({ participante1_id, participante2_id }) => {
  try {
    const [conversation, created] = await Conversacion.findOrCreate({
      where: {
        participante1_id,
        participante2_id
      },
      defaults: { participante1_id, participante2_id }
    });
    return conversation;
  } catch (error) {
    throw new Error('Error starting conversation: ' + error.message);
  }
};

exports.getMessages = async (conversationId) => {
  try {
    const messages = await Mensaje.findAll({
      where: { conversacion_id: conversationId },
      order: [['createdAt', 'ASC']]
    });
    return messages;
  } catch (error) {
    throw new Error('Error fetching messages: ' + error.message);
  }
};
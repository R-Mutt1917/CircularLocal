const Mensaje = require('../models/mensaje.model');

exports.sendMessage = async (conversationId, { remitente_id, contenido }) => {
  try {
    const message = await Mensaje.create({
      conversacion_id: conversationId,
      remitente_id,
      contenido
    });
    return message;
  } catch (error) {
    throw new Error('Error sending message: ' + error.message);
  }
};
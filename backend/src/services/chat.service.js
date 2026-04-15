const { Conversacion, Mensaje, User } = require('../models');

exports.startConversation = async ({ user1_id, user2_id }) => {
  // Buscar si ya existe una conversación entre estos dos usuarios
  let conversacion = await Conversacion.findOne({
    where: { user1_id, user2_id }
  });
  if (!conversacion) {
    conversacion = await Conversacion.create({ user1_id, user2_id });
  }
  return conversacion;
};

exports.getMessages = async (conversationId) => {
  return await Mensaje.findAll({
    where: { conversacion_id: conversationId },
    include: [{ model: User, as: 'remitente', attributes: ['id', 'username'] }],
    order: [['createdAt', 'ASC']]
  });
};

exports.sendMessage = async (conversationId, { remitente_id, contenido }) => {
  return await Mensaje.create({
    conversacion_id: conversationId,
    remitente_id,
    contenido
  });
};
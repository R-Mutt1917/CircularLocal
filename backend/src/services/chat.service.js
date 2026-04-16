const { Conversacion, Mensaje } = require('../models');
const { Op } = require('sequelize');
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

exports.startConversation = async (participante1_id, participante2_id) => {
    // Buscar en ambas direcciones
    let conversacion = await Conversacion.findOne({
        where: { participante1_id, participante2_id }
    });
    if (!conversacion) {
        conversacion = await Conversacion.findOne({
            where: {
                participante1_id: participante2_id,
                participante2_id: participante1_id
            }
        });
    }
    if (!conversacion) {
        conversacion = await Conversacion.create({ participante1_id, participante2_id });
    }
    return conversacion;
};

exports.getMessages = async (conversacionId) => {
    return await Mensaje.findAll({
        where: { conversacion_id: conversacionId },
        order: [['createdAt', 'ASC']]
    });
};

exports.getConversaciones = async (userId) => {
    return await Conversacion.findAll({
        where: {
            [Op.or]: [
                { participante1_id: userId },
                { participante2_id: userId }
            ]
        },
        order: [['updatedAt', 'DESC']]
    });
};

io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id);

  // Unirse a una conversación
  socket.on('join-conversacion', (conversacionId) => {
    socket.join(`conversacion-${conversacionId}`);
    console.log(`Usuario ${socket.id} se unió a la conversación ${conversacionId}`);
  });

  // Enviar mensaje
  socket.on('send-message', (data) => {
    const { conversacionId, mensaje } = data;
    console.log(`Mensaje recibido en la conversación ${conversacionId}:`, mensaje);

    // Reenviar el mensaje a los usuarios en la misma conversación
    io.to(`conversacion-${conversacionId}`).emit('receive-message', mensaje);
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado:', socket.id);
  });
});

module.exports = io; // Asegurarse de exportar el módulo correctamente
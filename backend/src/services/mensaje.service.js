const { Mensajes, Conversacion, ConversacionesUsuarios } = require('../models');

// ─────────────────────────────────────────────
// Obtener mensajes de una conversación (paginado)
// ─────────────────────────────────────────────
const findByConversation = async (conversationId, limit = 50, offset = 0) => {
    const mensajes = await Mensajes.findAll({
        where: { conversationId },
        order: [['fechaEnvio', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset),
    });

    return mensajes;
};

// ─────────────────────────────────────────────
// Crear un mensaje nuevo
// ─────────────────────────────────────────────
const createMensaje = async ({ conversationId, userId, mensaje }) => {
    const t = await Mensajes.sequelize.transaction();

    try {
        // 1. Insertar el mensaje
        const nuevoMensaje = await Mensajes.create(
            { conversationId, userId, mensaje, fechaEnvio: new Date() },
            { transaction: t }
        );

        // 2. Actualizar último mensaje en la conversación
        await Conversacion.update(
            { ultimoMensaje: mensaje, fechaActualizacion: new Date() },
            { where: { id: conversationId }, transaction: t }
        );

        // 3. Incrementar cantidadNoLeidos a todos MENOS al sender
        await ConversacionesUsuarios.increment('cantidadNoLeidos', {
            by: 1,
            where: {
                conversationId,
                userId: { [require('sequelize').Op.ne]: userId },  // Op.ne = "not equal"
            },
            transaction: t,
        });

        await t.commit();
        return nuevoMensaje;

    } catch (error) {
        await t.rollback();
        throw error;
    }
};

// ─────────────────────────────────────────────
// Marcar mensajes como leídos (resetear contador)
// ─────────────────────────────────────────────
const markAsRead = async (conversationId, userId) => {
    await ConversacionesUsuarios.update(
        { cantidadNoLeidos: 0, fechaUltimoLeido: new Date() },
        { where: { conversationId, userId } }
    );
};

module.exports = {
    findByConversation,
    createMensaje,
    markAsRead,
};
const mensajeService = require('../services/mensaje.service');

module.exports = (io) => {
    io.on('connection', (socket) => {
        const userId = socket.handshake.auth.userId;

        socket.on('join_conversation', async ({ conversationId }) => {
            socket.join(`conversation_${conversationId}`);
            await mensajeService.markAsRead(conversationId, userId);      // ← service
            socket.to(`conversation_${conversationId}`).emit('user_reading', { userId });
        });

        socket.on('send_message', async ({ conversationId, mensaje }) => {
            try {
                const nuevoMensaje = await mensajeService.createMensaje({   // ← service
                    conversationId,
                    userId,
                    mensaje,
                });

                io.to(`conversation_${conversationId}`).emit('new_message', nuevoMensaje);
            } catch (err) {
                socket.emit('error', { message: 'Error al enviar el mensaje' });
            }
        });

        socket.on('typing', ({ conversationId }) => {
            socket.to(`conversation_${conversationId}`).emit('user_typing', { userId });
        });

        socket.on('stop_typing', ({ conversationId }) => {
            socket.to(`conversation_${conversationId}`).emit('user_stop_typing', { userId });
        });

        socket.on('disconnect', () => {
            console.log(`🔴 Usuario ${userId} desconectado`);
        });
    });
};
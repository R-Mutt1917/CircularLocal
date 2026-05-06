const mensajeService = require('../services/mensaje.service');
const { verifyTokenSocket } = require('../middlewares/socket.middleware');

module.exports = (io) => {

    console.log("Socket handler cargado");

    io.use(async (socket, next) => {
        console.log("Auth middleware ejecutándose");
        try {
            const token = socket.handshake.auth.token;

            if (!token) {
                return next(new Error("No token"));
            }

            const user = await verifyTokenSocket(token);
            socket.user = user;

            next();
        } catch (err) {
            next(new Error("Auth error"));
        }
    });

    io.on('connection', (socket) => {
        console.log("🟢 Usuario conectado");
        console.log("socket.user:", socket.user);

        const userId = socket.user.id;

        console.log("userId:", userId);

        socket.on('join_conversation', async ({ conversationId }) => {
            socket.join(`conversation_${conversationId}`);
            await mensajeService.markAsRead(conversationId, userId);

            socket.to(`conversation_${conversationId}`)
                .emit('user_reading', { userId });
        });

        socket.on('send_message', async ({ conversationId, mensaje }) => {
            try {
                const nuevoMensaje = await mensajeService.createMensaje({
                    conversationId,
                    userId,
                    mensaje,
                });

                io.to(`conversation_${conversationId}`)
                    .emit('new_message', nuevoMensaje);

            } catch (err) {
                socket.emit('error', { message: 'Error al enviar el mensaje' });
            }
        });

        socket.on('disconnect', () => {
            console.log(`🔴 Usuario ${userId} desconectado`);
        });
    });
};
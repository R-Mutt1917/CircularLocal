const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const logger = require('./logger'); // Logger para mensajes

function configureSocketIO(server) {
    const io = new Server(server, { cors: { origin: '*' } });

    // Middleware de autenticación
    io.use((socket, next) => {
        const token = socket.handshake.auth.token;
        if (!token) {
            logger.warn('Conexión rechazada: Token no proporcionado.');
            return next(new Error('Token de autenticación requerido'));
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            socket.user = decoded;
            next();
        } catch (err) {
            logger.warn('Conexión rechazada: Token inválido.');
            next(new Error('Token de autenticación inválido'));
        }
    });

    // Eventos de conexión
    io.on('connection', (socket) => {
        logger.info(`Usuario conectado: ${socket.user?.id || 'Desconocido'}`);

        socket.on('send-message', (data) => {
            // Enviar el mensaje al destinatario específico
            io.to(data.recipientId).emit('receive-message', data);
            logger.info(`Mensaje enviado de ${socket.user?.id} a ${data.recipientId}`);
        });

        socket.on('disconnect', () => {
            logger.info(`Usuario desconectado: ${socket.user?.id || 'Desconocido'}`);
        });
    });

    return io;
}

module.exports = { configureSocketIO };
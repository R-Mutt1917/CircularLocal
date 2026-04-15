const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const logger = require('./logger');
const { Mensaje } = require('../models');

function configureSocketIO(server) {
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:4200', // URL del frontend Angular
      methods: ['GET', 'POST'],
      credentials: true
    }
  });

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

  io.on('connection', (socket) => {
    logger.info(`Usuario conectado: ${socket.user?.id}`);

    // El usuario se une a su sala personal con su ID
    // Así podemos enviarle mensajes directamente
    socket.join(`user_${socket.user.id}`);
    logger.info(`Usuario ${socket.user.id} unido a sala user_${socket.user.id}`);

    socket.on('send-message', async (data) => {
      const { conversacionId, contenido, destinatarioId } = data;
      try {
        // 1. Guardar mensaje en la base de datos
        const mensaje = await Mensaje.create({
          conversacion_id: conversacionId,
          remitente_id: socket.user.id,
          contenido
        });

        const mensajeConDatos = {
          id: mensaje.id,
          conversacion_id: conversacionId,
          remitente_id: socket.user.id,
          contenido,
          createdAt: mensaje.createdAt
        };

        // 2. Enviar al destinatario en su sala personal
        io.to(`user_${destinatarioId}`).emit('receive-message', mensajeConDatos);

        // 3. Confirmar al remitente que se envió
        socket.emit('message-sent', mensajeConDatos);

        logger.info(`Mensaje guardado y enviado de ${socket.user.id} a ${destinatarioId}`);
      } catch (error) {
        logger.error('Error al enviar mensaje:', error);
        socket.emit('message-error', { error: 'No se pudo enviar el mensaje' });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`Usuario desconectado: ${socket.user?.id}`);
    });
  });

  return io;
}

module.exports = { configureSocketIO };
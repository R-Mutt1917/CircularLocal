//Punto de entrada
const app = require('./src/app');
const { initDB } = require('./src/config/database');
const { seedTags } = require('./src/seeds/tag.seed');
const { seedAdmin } = require('./src/seeds/admin.seed');
const http = require('http');
const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await initDB();

        await seedTags();
        await seedAdmin();

        const server = http.createServer(app);
        const io = new Server(server, { cors: { origin: '*' } });

        io.use((socket, next) => {
            const token = socket.handshake.auth.token;
            if (!token) {
                return next(new Error('Token de autenticación requerido'));
            }
            try {
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                socket.user = decoded;
                next();
            } catch (err) {
                next(new Error('Token de autenticación inválido'));
            }
        });

        io.on('connection', (socket) => {
            console.log('User connected:', socket.user);

                socket.on('send-message', (data) => {
                    // Enviar el mensaje al destinatario específico
                    io.to(data.recipientId).emit('receive-message', data);
                });

                socket.on('disconnect', () => {
                console.log('User disconnected:', socket.user);
            });
        });

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
}

startServer();

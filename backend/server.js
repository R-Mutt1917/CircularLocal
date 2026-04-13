// Punto de entrada
const app = require('./src/app');
const { initDB } = require('./src/config/database');
const { seedTags } = require('./src/seeds/tag.seed');
const { seedAdmin } = require('./src/seeds/admin.seed');
const http = require('http');
const { configureSocketIO } = require('./src/utils/socket'); // Módulo separado para WebSocket
const logger = require('./src/utils/logger'); // Logger personalizado

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        // Inicializar la base de datos
        await initDB();
        logger.info('Base de datos inicializada correctamente.');

        // Semillas
        await seedTags();
        logger.info('Tags inicializados correctamente.');
        await seedAdmin();
        logger.info('Administrador inicializado correctamente.');

        // Crear servidor HTTP
        const server = http.createServer(app);

        // Configurar WebSocket
        configureSocketIO(server);

        // Iniciar servidor
        server.listen(PORT, () => {
            logger.info(`Servidor corriendo en el puerto ${PORT}`);
        });
    } catch (error) {
        logger.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
}

startServer();

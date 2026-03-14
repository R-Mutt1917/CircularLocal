//Punto de entrada
const app = require('./src/app');
const { initDB } = require('./src/config/database');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await initDB();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
}

startServer();

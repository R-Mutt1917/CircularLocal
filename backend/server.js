//Punto de entrada
const app = require('./src/app');
const { initDB } = require('./src/config/database');
const { seedTags } = require('./src/seeds/tag.seed');
const { seedAdmin } = require('./src/seeds/admin.seed');
const { inicializarMetricas } = require('./src/seeds/metricaImpacto.seed');

const PORT = process.env.PORT || 3000;

async function startServer() {
    try {
        await initDB();

        await seedTags();
        await seedAdmin();
        await inicializarMetricas();

        app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

    } catch (error) {
        console.error('Error iniciando el servidor:', error);
        process.exit(1);
    }
}

startServer();

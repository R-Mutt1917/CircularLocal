const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

const initDB = async () => {
    try {
        let connected = false;

        while (!connected) {
            try {
                await sequelize.authenticate();
                await sequelize.sync({ force: false });
                console.log('¡Conexión establecida correctamente!');
                connected = true;
            } catch (error) {
                console.log('⏳ Esperando a MySQL...');
                await new Promise((res) => setTimeout(res, 5000));
            }
        }
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}


module.exports = { sequelize, initDB };
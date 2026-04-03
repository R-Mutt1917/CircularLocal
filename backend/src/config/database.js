const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false
    }
);

const initDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('¡Conexión establecida correctamente!');
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
}


module.exports = { sequelize, initDB };
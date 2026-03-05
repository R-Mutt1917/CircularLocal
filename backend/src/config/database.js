const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('circular_local_db', 'circular_local_user', 'circular_local_password', {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
});

const initDB = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ force: false});
    } catch (error) {
        console.error(error)
    }
}

module.exports = {sequelize,initDB};
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Mensajes = sequelize.define('Mensajes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    mensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    fechaEnvio: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'Mensajes',
    timestamps: false
});

module.exports = Mensajes;
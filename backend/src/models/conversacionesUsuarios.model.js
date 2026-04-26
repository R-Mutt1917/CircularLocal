const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const ConversacionesUsuarios = sequelize.define('ConversacionesUsuarios', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    cantidadNoLeidos: {
        type: DataTypes.INTEGER,
        defaultValue: 0
    },
    fechaUltimoLeido: {
        type: DataTypes.DATE
    }
}, {
    tableName: 'ConversacionesUsuarios',
    timestamps: false
});

module.exports = ConversacionesUsuarios;
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Intercambio = sequelize.define('Intercambio', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    solicitudId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    confirmadoSolicitante: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    confirmadoPublicador: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    fechaCierre: {
        type: DataTypes.DATE,
        allowNull: true
    },
    estadoIntercambio: {
        type: DataTypes.ENUM('EN_PROCESO', 'COMPLETADO', 'CANCELADO'),
        allowNull: false,
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, {
    tableName: 'Intercambio',
    timestamps: false
});

module.exports = Intercambio;
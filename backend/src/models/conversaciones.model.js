const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Conversacion = sequelize.define('Conversacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    intercambioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },
    ultimoMensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaActualizacion: {
        type: DataTypes.DATE,
        allowNull: true
    },
    solicitanteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    publicadorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    tableName: 'Conversacion',
    timestamps: false
});

module.exports = Conversacion;
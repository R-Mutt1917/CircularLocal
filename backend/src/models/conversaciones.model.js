const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Conversacion = sequelize.define('Conversacion', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    ultimoMensaje: {
        type: DataTypes.STRING,
        allowNull: false
    },
    fechaActualizacion: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Conversacion',
    timestamps: false
});

module.exports = Conversacion;
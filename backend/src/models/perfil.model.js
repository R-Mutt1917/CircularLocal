const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Perfil = sequelize.define('Perfil', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    nombre_perfil: {
        type: DataTypes.STRING
    },

    descripcion: {
        type: DataTypes.STRING
    },

    direccion: {
        type: DataTypes.STRING
    },

    telefono: {
        type: DataTypes.STRING
    },

    email: {
        type: DataTypes.STRING
    },

    tipo_actor: {
        type: DataTypes.ENUM('COOPERATIVA', 'RECICLADOR', 'EMPRENDEDOR')
    }

}, {
    tableName: 'Perfil',
    timestamps: false
});

module.exports = Perfil;
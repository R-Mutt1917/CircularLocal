const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Solicitud = sequelize.define('Solicitud', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  publicacionId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  solicitanteId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  mensajeInicial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estadoSolicitud: {
    type: DataTypes.ENUM('PENDIENTE', 'ACEPTADA', 'RECHAZADA', 'CANCELADA'),
    allowNull: false,
  },
  fechaCreacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  timestamps: true,
  updatedAt: false,
});

module.exports = Solicitud;
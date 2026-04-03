const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Servicio = sequelize.define('Servicio', {
  modalidad: {
    type: DataTypes.ENUM('PRESENCIAL', 'REMOTO', 'MIXTO'),
    allowNull: false,
  },
  disponibilidadHoraria: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zonaCobertura: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  updatedAt: false,
});

module.exports = Servicio;
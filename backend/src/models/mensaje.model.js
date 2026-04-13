const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Mensaje = sequelize.define('Mensaje', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  conversacion_id: { type: DataTypes.INTEGER, allowNull: false },
  remitente_id: { type: DataTypes.INTEGER, allowNull: false },
  contenido: { type: DataTypes.TEXT, allowNull: false },
  leido: { type: DataTypes.BOOLEAN, defaultValue: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: false });

module.exports = Mensaje;
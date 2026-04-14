const { DataTypes } = require('sequelize');
const {sequelize } = require('../config/database');

const Conversacion = sequelize.define('Conversacion', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  participante1_id: { type: DataTypes.INTEGER, allowNull: false },
  participante2_id: { type: DataTypes.INTEGER, allowNull: false },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: true });

module.exports = Conversacion;
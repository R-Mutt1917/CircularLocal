const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Material = sequelize.define('Material', {
  nombreMaterial: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  unidad: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  updatedAt: false,
});

module.exports = Material;
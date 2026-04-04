const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Tag = require('./tags.model');

const Publicacion = sequelize.define('Publicacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  estado: {
    type: DataTypes.ENUM('Borrador', 'Publicada', 'Finalizada', 'Cancelada'),
    allowNull: false,
    defaultValue: 'Borrador',
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  verificada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  reportada: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  tipo: {
    type: DataTypes.ENUM('MATERIAL', 'PRODUCTO', 'SERVICIO'),
    allowNull: false,
  }
}, {
  timestamps: true,
  updatedAt: false,
});

Publicacion.belongsTo(Tag, { foreignKey: 'tagId', as: 'tag' });

module.exports = Publicacion;
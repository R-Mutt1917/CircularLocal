const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Tag = require('./tags.model');

const Publicacion = sequelize.define('Publicacion', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: true,
  updatedAt: false,
});

Publicacion.belongsTo(Tag, { foreignKey: 'tagId', as: 'tag' });

module.exports = Publicacion;
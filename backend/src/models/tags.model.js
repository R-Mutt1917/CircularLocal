const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Tag = sequelize.define('Tag', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});

module.exports = Tag;

// Datos iniciales para los tipos de materiales
(async () => {
  const initialTags = [
    'Madera Recup.',
    'Textiles Orgánicos',
    'Cerámica',
    'Herramientas',
    'Metalurgia'
  ];

  try {
    for (const tagName of initialTags) {
      await Tag.findOrCreate({ where: { name: tagName } });
    }
    console.log('Datos iniciales de tags insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar los datos iniciales de tags:', error);
  }
})();
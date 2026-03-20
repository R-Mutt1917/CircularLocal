const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Publicacion = sequelize.define('Publicacion', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [5, 255] } // Validación de longitud del título 
    }, 
    descripcion:{
        type: DataTypes.TEXT,
        allowNull: false,
    },
    tipo: {
        type: DataTypes.ENUM('material', 'producto', 'servicio'),
        allowNull: false,
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,    
    },
    fechaActualizacion: {
        type: DataTypes.DATE,
    },
    fechaFinalizacion: {
        type: DataTypes.DATE,
    },
    fechaEliminacion: {
        type: DataTypes.DATE,
    },
    // Estado unificado para controlar el ciclo de vida de la publicación
    estado: {
        type: DataTypes.ENUM('borrador', 'publicada', 'finalizada', 'cancelada'),
        allowNull: false,
        defaultValue: 'borrador',
    },
    imagenPrincipal: {
        type: DataTypes.STRING,
        validate: { isUrl: true }, // Opcional: validar que sea una URL o path
    },
    verificada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    reportada: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
}, {
    tableName: 'publicaciones',
    timestamps: false, // Manejamos manualmente las fechas de creación, actualización, finalización y eliminación
    paranoid: false, // No se utiliza eliminación lógica a nivel de Sequelize, se maneja manualmente con fechaEliminacion
});

// Metodo de instancia para actualizar el estado de la publicación
Publicacion.prototype.crear = function() {
    this.estado = 'borrador';
};

Publicacion.prototype.publicar = function() {
    this.estado = 'publicada';
    this.fechaActualizacion = new Date();
};

Publicacion.prototype.finalizar = function() {
    this.estado = 'finalizada';
    this.fechaFinalizacion = new Date();
};

Publicacion.prototype.cancelar = function() {
    this.estado = 'cancelada';
    this.fechaEliminacion = new Date();
};

Publicacion.prototype.comentar = function () {
  // Implementar lógica de comentarios
};

Publicacion.prototype.solicitar = function () {
  // Implementar lógica de solicitudes
};

Publicacion.prototype.reportar = function () {
  this.reportada = true;
};

Publicacion.prototype.aceptar = function () {
  this.verificada = true;
};

module.exports = Publicacion;
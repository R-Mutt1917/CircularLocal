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
    estado: {
        type: DataTypes.ENUM('borrador', 'publicada', 'finalizada', 'cancelada'),
        allowNull: false,
        defaultValue: 'borrador',
    },
    imagenPrincipal: {
        type: DataTypes.STRING,
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
    timestamps: false,
});

// Metodo de instancia para actualizar el estado de la publicación
Publicacion.prototype.crear = function() {
    this.estado = 'borrador';
};

Publicacion.prototype.publicar = function() {
    this.estadoPublicacion = 'publicada';
    this.fechaActualizacion = new Date();
};

Publicacion.prototype.finalizar = function() {
    this.estadoPublicacion = 'finalizada';
    this.fechaFinalizacion = new Date();
};

Publicacion.prototype.cancelar = function() {
    this.estadoPublicacion = 'cancelada';
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
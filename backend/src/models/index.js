const User = require('./usuario.model');
const Perfil = require('./perfil.model');
const Publicacion = require('./publicacion.model');
const Tag = require('./tags.model');
const Solicitud = require('./solicitud.model');
const Material = require('./material.model');
const Producto = require('./producto.model');
const Servicio = require('./servicio.model');
const Intercambio = require('./intercambio.model');
const MetricaImpacto = require('./metricaImpacto.model');

// Relacion User - Perfil
User.hasOne(Perfil, {
    foreignKey: 'user_id',
    as: 'perfil'
});

Perfil.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Relacion User - Publicacion
User.hasMany(Publicacion, {
    foreignKey: 'user_id',
    as: 'publicaciones'
});

Publicacion.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

// Relacion Publicacion - Solicitud
Publicacion.hasMany(Solicitud, {
    foreignKey: 'publicacionId',
    as: 'solicitudes'
})

Solicitud.belongsTo(Publicacion, {
    foreignKey: 'publicacionId',
    as: 'publicacion'
})

// Relacion User - Solicitud
User.hasMany(Solicitud, {
    foreignKey: 'solicitanteId',
    as: 'solicitudes'
})

Solicitud.belongsTo(User, {
    foreignKey: 'solicitanteId',
    as: 'solicitante'
})
// Relacion Publicacion - Tipo Recursos
Publicacion.hasOne(Material, {
    foreignKey: 'publicacionId',
});

Material.belongsTo(Publicacion, {
    foreignKey: {
        name: 'publicacionId',
        allowNull: false
    },
    unique: true
});

Publicacion.hasOne(Producto, {
    foreignKey: 'publicacionId',
});

Producto.belongsTo(Publicacion, {
    foreignKey: {
        name: 'publicacionId',
        allowNull: false
    },
    unique: true
});

Publicacion.hasOne(Servicio, {
    foreignKey: 'publicacionId',
});

Servicio.belongsTo(Publicacion, {
    foreignKey: {
        name: 'publicacionId',
        allowNull: false
    },
    unique: true
});

// Relacion Intercambio - Solicitud
Solicitud.hasOne(Intercambio, {
    foreignKey: 'solicitudId',
    as: 'intercambio'
});

Intercambio.belongsTo(Solicitud, {
    foreignKey: 'solicitudId',
    as: 'solicitud'
});

module.exports = {
    User,
    Perfil,
    Publicacion,
    Tag,
    Solicitud,
    Intercambio,
    MetricaImpacto,
};

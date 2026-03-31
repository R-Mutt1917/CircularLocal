const User = require('./usuario.model');
const Perfil = require('./perfil.model');
const Publicacion = require('./publicacion.model');
const Tag = require('./tags.model');
const Material = require('./material.model');
const Producto = require('./producto.model');

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

module.exports = {
    User,
    Perfil,
    Publicacion,
    Tag,
};

const User = require('./usuario.model');
const Perfil = require('./perfil.model');
const Publicacion = require('./publicacion.model');
const Tag = require('./tags.model');

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

module.exports = {
    User,
    Perfil,
    Publicacion,
    Tag,
};

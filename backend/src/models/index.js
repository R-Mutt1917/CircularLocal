const User = require('./usuario.model');
const Perfil = require('./perfil.model');

// Relacion User - Perfil
User.hasOne(Perfil, {
    foreignKey: 'user_id',
    as: 'perfil'
});

Perfil.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

module.exports = { 
    User,
    Perfil,
};

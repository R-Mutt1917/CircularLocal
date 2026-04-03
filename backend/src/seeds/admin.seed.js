const bcrypt = require('bcrypt');
const { User } = require('../models');
const { createProfile } = require('../services/perfil.service');

const seedAdmin = async () => {

    const username = 'admin';
    const exists = await User.findOne({ where: { username } });
    if (exists) return null;

    const hash = await bcrypt.hash('admin', 10);

    // Crea el admin
    const admin = await User.create({
        username,
        password: hash,
        rol: 'ADMIN',
        fecha_registro: new Date(),
        activo: true
    });

    // Crea el perfil vacio
    await createProfile(admin.id);

    return admin;
};

module.exports = { seedAdmin };
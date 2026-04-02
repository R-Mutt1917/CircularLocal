const { User } = require('../models');

const banUser = async (id) => {
    const user = await User.findByPk(id);
    if (!user) return null;

    if (!user.activo) {
        throw new Error("El usuario ya está dado de baja");
    }

    user.activo = false;
    await user.save();

    return user;
}

module.exports = { banUser }

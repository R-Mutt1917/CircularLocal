const { User } = require('../models');

const banUser = async (userId, adminId) => {
    if (adminId === userId) {
        throw new Error("No puedes banearte a ti mismo");
    }

    const user = await User.findByPk(userId);
    if (!user) return null;

    if (!user.activo) {
        throw new Error("El usuario ya está dado de baja");
    }

    user.activo = false;
    await user.save();

    return user;
}

module.exports = { banUser }

const userService = require('../services/user.service');

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, ...profileData } = req.body;

        const user = username ? { username } : {};
        const updatedUser = await userService.updateUserWithProfile(id, user, profileData);

        res.status(200).json({ message: 'Perfil de usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    // Valida el id recibido
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const user = await userService.deleteUser(id);

        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        return res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getPublicacionPerfil = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await userService.getPublicacionPerfil(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    updateUser,
    deleteUser,
    getPublicacionPerfil
};

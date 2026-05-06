const userService = require('../services/user.service');

const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { username, ...profileData } = req.body;

        const user = username ? { username } : {};
        const updatedUser = await userService.updateUserWithProfile(id, user, profileData);

        res.status(200).json({ message: 'Perfil de usuario actualizado correctamente', user: updatedUser });
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    // Valida el id recibido
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const user = await userService.deleteUser(id);

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};



module.exports = {
    updateUser,
    deleteUser,
};

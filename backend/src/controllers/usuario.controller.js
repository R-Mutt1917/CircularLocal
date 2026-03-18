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

module.exports = {
    updateUser
};

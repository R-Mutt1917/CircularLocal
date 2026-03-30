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

const updateUserWithProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, ...profileData } = req.body;

    const userData = username ? { username } : {};

    const result = await userService.updateUserWithProfile(
      userId,
      userData,
      profileData
    );

    if (!result) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Usuario y perfil actualizados',
      user: result
    });

  } catch (error) {
    console.error("ERROR UPDATE:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
    updateUser,
    deleteUser,
    updateUserWithProfile
};

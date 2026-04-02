const adminService = require('../services/admin.service');

const banearUsuario = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const user = await adminService.banUser(id);

        if (!user) {
            return res.status(404).json({
                error: "Usuario no encontrado"
            });
        }

        return res.status(200).json({ message: 'Usuario baneado' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { banearUsuario };
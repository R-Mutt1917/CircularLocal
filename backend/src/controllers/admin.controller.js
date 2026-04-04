const adminService = require('../services/admin.service');
const { toListUserDTO } = require('../dto/usuario.dto');

const banearUsuario = async (req, res) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const adminId = req.user.id
        const user = await adminService.banUser(userId, adminId);

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

const obtenerUsuarios = async (req, res) => {
    try {
        const { page = 1, limit = 5 } = req.query; // Parámetros de paginación

        // Validar que los parámetros sean números positivos
        if (page <= 0 || limit <= 0) {
            return res.status(400).json({ mensaje: 'Los parámetros de paginación deben ser números positivos.' });
        }

        const users = await adminService.getUsers(page, limit);

        const usersDto = toListUserDTO(users.rows);

        return res.status(200).json({
            total: users.count,
            paginas: Math.ceil(users.count / limit),
            users: usersDto,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    banearUsuario,
    obtenerUsuarios,
};
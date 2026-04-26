const adminService = require('../services/admin.service');
const { toPublicacionReportadaListDTO } = require('../dto/publicacion.dto');
const { toListUserDTO } = require('../dto/usuario.dto');

const banearUsuario = async (req, res, next) => {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const adminId = req.user.id
        const user = await adminService.banUser(userId, adminId);

        return res.status(200).json({ message: 'Usuario baneado' });
    } catch (error) {
        next(error);
    }
};

const getPublicacionReportadas = async (req, res, next) => {
  try {
    const { page = 1, limit = 5 } = req.query; // Parámetros de paginación

    // Validar que los parámetros sean números positivos
    if (page <= 0 || limit <= 0) {
        return res.status(400).json({ mensaje: 'Los parámetros de paginación deben ser números positivos.' });
    }

    const publicacionesReportadas = await adminService.getPublicacionReportadas(page, limit);

    const publicacionesDto = toPublicacionReportadaListDTO(publicacionesReportadas);

    return res.status(200).json({
        total: publicacionesReportadas.count,
        paginas: Math.ceil(publicacionesReportadas.count / limit),
        publicaciones: publicacionesDto,
    });
    
  } catch (error) {
    next(error);
  }
}

const obtenerUsuarios = async (req, res, next) => {
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
        next(error);
    }
};

const cancelarPublicacion = async (req, res, next) => {
    const publicacionId = parseInt(req.params.id);
    if (isNaN(publicacionId)) {
        return res.status(400).json({ message: "ID inválido" });
    }

    try {
        const publicacion = await adminService.cancelar(publicacionId);

        return res.status(200).json({ message: 'Publicación cancelada' });
    } catch (error) {
        next(error);
    }
}

const obtenerMetricas = async (req, res, next) => {
    try {
        const metricas = await adminService.getMetricas();

        return res.status(200).json(metricas);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    banearUsuario,
    obtenerUsuarios,
    getPublicacionReportadas,
    cancelarPublicacion,
    obtenerMetricas,
};

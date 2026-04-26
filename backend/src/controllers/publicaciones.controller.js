const { toPublicacionDTO, toPublicacionListDTO, toPublicacionDetalleDTO, toPublicacionPreviewDTO, toPublicacionPreviewListDTO } = require('../dto/publicacion.dto');
const publicacionService = require('../services/publicacion.service');

// Crear una nueva publicación
const crearPublicacion = async (req, res, next) => {
  try {
    const userId = req.user.id; // Asignamos el ID del usuario autenticado

    // Crear la publicación inyectando el userId
    const nuevaPublicacion = await publicacionService.crearPublicacion({
      ...req.body,
      user_id: userId
    });

    res.status(201).json(toPublicacionDTO(nuevaPublicacion));
  } catch (error) {
    next(error);
  }
};

// Activar una publicación (cambiar estado a 'publicada')
const activarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const publicacion = await publicacionService.activarPublicacion(id);

    res.status(200).json(toPublicacionDTO(publicacion));
  } catch (error) {
    next(error);
  }
};

// Finalizar una publicación (cambiar estado a 'finalizada')
const finalizarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const publicacion = await publicacionService.finalizarPublicacion(id);

    res.status(200).json(toPublicacionDTO(publicacion));
  } catch (error) {
    next(error);
  }
};

// Cacelar una publicación (cambiar estado a 'cancelada')
const cancelarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Buscar la publicación por ID
    const publicacion = await publicacionService.cancelarPublicacion(id);

    res.status(200).json(toPublicacionDTO(publicacion));
  } catch (error) {
    next(error);
  }
};

// Modificar una publicación existente (actualizar título, descripción o imagen principal)
const editarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const publicacionActualizada = await publicacionService.editarPublicacion(
      id,
      req.body
    );

    res.status(200).json(toPublicacionDTO(publicacionActualizada));
  } catch (error) {
    next(error);
  }
};

// Consultar publicaciones con paginación
const consultarPublicaciones = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Parámetros de paginación

    // Validar que los parámetros sean números positivos
    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ mensaje: 'Los parámetros de paginación deben ser números positivos.' });
    }

    const publicaciones = await publicacionService.obtenerPublicacionesPaginadas(page, limit);

    const publicacionesDTO = toPublicacionListDTO(publicaciones.rows);

    res.status(200).json({
      total: publicaciones.count,
      paginas: Math.ceil(publicaciones.count / limit),
      publicaciones: publicacionesDTO,
    });
  } catch (error) {
    next(error);
  }
};

// Consultar una publicación
const consultarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    // Buscar la publicación por ID
    const publicacion = await publicacionService.obtenerPublicacion(id);

    res.status(200).json(toPublicacionDTO(publicacion));
  } catch (error) {
    next(error);
  }
};

// Listar todos los tags
const listarTags = async (req, res, next) => {
  try {
    const tags = await publicacionService.obtenerTags();
    res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

const getPublicacionesByUser = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const { limit } = req.query;

    const publicaciones = await publicacionService.getByUser(id, limit)

    const publicacionesDTO = toPublicacionListDTO(publicaciones);
    res.status(200).json(publicacionesDTO);
  } catch (error) {
    next(error);
  }
}


const getPublicacionDetalle = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const publicacion = await publicacionService.getPublicacionDetalle(id);
    const publicacionDTO = toPublicacionDetalleDTO(publicacion);
    res.status(200).json(publicacionDTO);
  } catch (error) {
    next(error);
  }
}

const getPreviewPublicaciones = async (req, res, next) => {
  try {
    const publicaciones = await publicacionService.getPreviewPublicaciones();
    const publicacionesDTO = toPublicacionPreviewListDTO(publicaciones);
    res.status(200).json(publicacionesDTO);
  } catch (error) {
    next(error);
  }
}

const reportarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const resultado = await publicacionService.reportar(id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

const eliminarPublicacion = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const resultado = await publicacionService.eliminar(id);
    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  crearPublicacion,
  activarPublicacion,
  finalizarPublicacion,
  cancelarPublicacion,
  editarPublicacion,
  consultarPublicacion,
  consultarPublicaciones,
  getPublicacionDetalle,
  getPreviewPublicaciones,
  reportarPublicacion,
  eliminarPublicacion,
  listarTags,
  getPublicacionesByUser,
};
const { Publicacion, Tag } = require('../models');
const { toPublicacionDTO, toPublicacionListDTO } = require('../dto/publicacion.dto');
const { getByUser } = require('../services/publicacion.service');

// Crear una nueva publicación
exports.crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, tagId } = req.body;

    // Verificar que el tag exista
    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(400).json({ mensaje: 'El tipo de material (tag) no existe.' });
    }

    // Crear la publicación
    const nuevaPublicacion = await Publicacion.create({
      titulo,
      descripcion,
      tagId,
    });

    res.status(201).json(nuevaPublicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la publicación.' });
  }
};

// Publicar una publicación (cambiar estado a 'publicada')
exports.publicarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    publicacion.publicar();
    await publicacion.save();

    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al publicar la publicación.' });
  }
};

// Finalizar una publicación (cambiar estado a 'finalizada')
exports.finalizarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    publicacion.finalizar();
    await publicacion.save();

    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al finalizar la publicación.' });
  }
};

// Cacelar una publicación (cambiar estado a 'cancelada')
exports.cancelarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la publicación por ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    // Cambiar el estado a cancelada y registrar la fecha de eliminación lógica
    publicacion.cancelar();
    await publicacion.save();

    res.status(200).json({ mensaje: 'Publicación cancelada exitosamente.', publicacion });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cancelar la publicación.' });
  }
};

// Modificar una publicación existente (actualizar título, descripción o imagen principal)
exports.editarPublicacion = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, imagenPrincipal, estadoPublicacion } = req.body;

    // Buscar la publicación por ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    // Actualizar los campos permitidos
    if (titulo) publicacion.titulo = titulo;
    if (descripcion) publicacion.descripcion = descripcion;
    if (imagenPrincipal) publicacion.imagenPrincipal = imagenPrincipal;
    if (estadoPublicacion) publicacion.estadoPublicacion = estadoPublicacion;

    publicacion.fechaActualizacion = new Date();

    // Guardar los cambios
    await publicacion.save();

    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al editar la publicación.' });
  }
};

// Consultar publicaciones con paginación
exports.consultarPublicaciones = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Parámetros de paginación

    // Validar que los parámetros sean números positivos
    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ mensaje: 'Los parámetros de paginación deben ser números positivos.' });
    }

    // Calcular el offset y el límite
    const offset = (page - 1) * limit;

    // Obtener las publicaciones con paginación
    const publicaciones = await Publicacion.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
    });

    const publicacionesDTO = toPublicacionListDTO(publicaciones.rows);

    res.status(200).json({
      total: publicaciones.count,
      paginas: Math.ceil(publicaciones.count / limit),
      publicaciones: publicacionesDTO,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar las publicaciones.' });
  }
};

// Consultar detalle de una publicación
exports.consultarDetallePublicacion = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscar la publicación por ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar el detalle de la publicación.' });
  }
};

// Obtener todas las publicaciones con tag
exports.getPublicaciones = async (req, res) => {
  try {
    const publicaciones = await Publicacion.findAll({
      include: [{ model: Tag, as: 'tag' }],
    });

    const publicacionesDTO = toPublicacionListDTO(publicaciones);

    res.status(200).json(publicacionesDTO);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener las publicaciones.' });
  }
};

// Listar todos los tags
exports.listarTags = async (req, res) => {
  try {
    const tags = await Tag.findAll();
    res.status(200).json(tags);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al listar los tags.' });
  }
};

// Asociar tags a una publicación
exports.asociarTags = async (req, res) => {
  try {
    const { id } = req.params;
    const { tags } = req.body; // Array de IDs de tags

    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    const tagsAsociados = await Tag.findAll({ where: { id: tags } });
    await publicacion.addTags(tagsAsociados);

    res.status(200).json({ mensaje: 'Tags asociados correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al asociar tags a la publicación.' });
  }
};

// Eliminar un tag de una publicación
exports.eliminarTag = async (req, res) => {
  try {
    const { id, tagId } = req.params;

    const publicacion = await Publicacion.findByPk(id);
    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    const tag = await Tag.findByPk(tagId);
    if (!tag) {
      return res.status(404).json({ mensaje: 'Tag no encontrado.' });
    }

    await publicacion.removeTag(tag);
    res.status(200).json({ mensaje: 'Tag eliminado correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar el tag de la publicación.' });
  }
};


exports.getPublicacionesByUser = async (req, res) => {
  try {
    const publicaciones = await getByUser(req.params.id)

    const publicacionesDTO = toPublicacionListDTO(publicaciones);
    res.status(200).json(publicacionesDTO);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener las publicaciones del usuario.' });
  }
}
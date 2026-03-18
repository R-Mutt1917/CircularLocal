const Publicacion = require('../models/publicacion.model');

// Crear una nueva publicación
exports.crearPublicacion = async (req, res) => {
  try {
    const { titulo, descripcion, imagenPrincipal } = req.body;

    // Validar campos obligatorios
    if (!titulo || !descripcion) {
      return res.status(400).json({ mensaje: 'Todos los campos son obligatorios.' });
    }

    // Crear la publicación
    const nuevaPublicacion = await Publicacion.create({
      titulo,
      descripcion,
      imagenPrincipal,
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
    
    // Buscar la publicación por su ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    // Cambiar el estado a 'cancelada' y guardar la fecha de eliminación lógica
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

    // Buscar la publicación por su ID
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    // Actualizar los campos de la permitidos
    if (titulo) publicacion.titulo = titulo;
    if (descripcion) publicacion.descripcion = descripcion;
    if (imagenPrincipal) publicacion.imagenPrincipal = imagenPrincipal;
    if (estadoPublicacion) publicacion.estadoPublicacion = estadoPublicacion;

    publicacion.fechaActualizacion = new Date();

    // Guardar los cambios en la base de datos
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

    //Validar que los parametros sean números positivos
    if (page <= 0 || limit <= 0) {
      return res.status(400).json({ mensaje: 'Los parámetros de paginación deben ser números positivos.' });
    }

    // Calcular el offset para la consulta
    const offset = (page - 1) * limit;

    // Obtener las publicaciones con paginación
    const { count, rows: publicaciones } = await Publicacion.findAndCountAll({
      offset,
      limit: parseInt(limit),
      order: [['createdAt', 'DESC']], // Ordenar por fecha de creación descendente
    });

    res.status(200).json({
      total: publicaciones.count,
      paginas: Math.ceil(publicaciones.count / limit),
      publicaciones: publicaciones.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al consultar las publicaciones.' });
  }
};
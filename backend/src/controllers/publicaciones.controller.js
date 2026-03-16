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
    const publicacion = await Publicacion.findByPk(id);

    if (!publicacion) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada.' });
    }

    publicacion.cancelar();
    await publicacion.save();

    res.status(200).json(publicacion);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al cancelar la publicación.' });
  }
};

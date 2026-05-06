const { Perfil } = require('../models');
const { NotFoundError, BadRequestError } = require('../errors/app.errors');

const createProfile = async (userId) => {
  return Perfil.create({
    user_id: userId,
  });
}

const getPerfil = async (perfilId) => {
  const perfil = await Perfil.findByPk(perfilId);
  return perfil;
}

const putPerfil = async (userId, perfilRequestDTO) => {
  // Valida el campo tipo_actor
  const tiposValidos = ['COOPERATIVA', 'RECICLADOR', 'EMPRENDEDOR'];
  if (perfilRequestDTO.tipo_actor && !tiposValidos.includes(perfilRequestDTO.tipo_actor)) {
    throw new BadRequestError('tipo_actor inválido');
  }

  // Busca el perfil asociado al usuario en la BD
  const perfil = await Perfil.findOne({
    where: { user_id: userId }
  });

  if (!perfil) throw new NotFoundError("Perfil no encontrado");

  // Actualiza el perfil
  await perfil.update(perfilRequestDTO);

  return perfil;
}

module.exports = {
  createProfile,
  getPerfil,
  putPerfil,
};

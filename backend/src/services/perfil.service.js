const { Perfil } = require('../models');

const createProfile = async (userId) => {
  return Perfil.create({
    user_id: userId,
  });
}

const getPerfil = async (perfilId) => {
  const perfil = await Perfil.findByPk(perfilId);
  return perfil;
}

const putPerfil = async (perfilId, perfilRequestDTO) => {
  // Valida el campo tipo_actor
  const tiposValidos = ['COOPERATIVA', 'RECICLADOR', 'EMPRENDEDOR'];
  if (perfilRequestDTO.tipo_actor && !tiposValidos.includes(perfilRequestDTO.tipo_actor)) {
    throw new Error('tipo_actor inválido');
  }

  // Busca el perfil en la BD
  const perfil = await Perfil.findByPk(perfilId);
  if (!perfil) return null;

  // Actualiza el perfil
  await perfil.update(perfilRequestDTO);

  return perfil;
}

module.exports = {
  createProfile,
  getPerfil,
  putPerfil,
};

const { where } = require('sequelize');
const { Perfil } = require('../models');

const createProfile = async (userId) => {
  return Perfil.create({
    user_id: userId,
  });
}

const getPerfil = async (userId) => {
  const perfil = await Perfil.findOne({
    where: {user_id: userId}
  });
  return perfil;
}

const putPerfil = async (userId, perfilRequestDTO, transaction) => {
  // Valida el campo tipo_actor
  const tiposValidos = ['COOPERATIVA', 'RECICLADOR', 'EMPRENDEDOR'];
  if (perfilRequestDTO.tipo_actor && !tiposValidos.includes(perfilRequestDTO.tipo_actor)) {
    throw new Error('tipo_actor inválido');
  }

  // Busca el perfil asociado al usuario en la BD
  const perfil = await Perfil.findOne({
    where: { user_id: userId },
    transaction
  });

  if (!perfil) return null;

  // Actualiza el perfil
  await perfil.update(perfilRequestDTO,{ transaction });

  return perfil;
}

module.exports = {
  createProfile,
  getPerfil,
  putPerfil,
};

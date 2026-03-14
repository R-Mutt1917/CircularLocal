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

module.exports = {
  createProfile,
  getPerfil,
};

const { Perfil } = require('../models');

const createProfile = async (userId) => {
  return Perfil.create({
    user_id: userId,
  });
}

module.exports = {
  createProfile,
};

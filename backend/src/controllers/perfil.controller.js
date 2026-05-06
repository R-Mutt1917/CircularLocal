const perfilService = require('../services/perfil.service');
const { toPerfilDTO } = require('../dto/perfil.dto');

const getPerfil = async (req, res, next) => {
    try {
        const perfilId = req.params.id;
        const perfil = await perfilService.getPerfil(perfilId);

        const perfilDTO = toPerfilDTO(perfil);

        return res.status(200).json(perfilDTO);
    } catch (error) {
        next(error);
    }
}

const putPerfil = async (req, res, next) => {
    try {
        const perfilId = req.params.id;

        const perfilRequestDTO = {
            nombre_perfil: req.body.nombre_perfil,
            imagen: req.body.imagen,
            descripcion: req.body.descripcion,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            tipo_actor: req.body.tipo_actor,
        };

        const perfil = await perfilService.putPerfil(perfilId, perfilRequestDTO);

        const perfilDTO = toPerfilDTO(perfil);

        return res.status(200).json(perfilDTO);
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getPerfil,
    putPerfil,
}

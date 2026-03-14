const perfilService = require('../services/perfil.service');
const { toPerfilDTO } = require('../dto/perfil.dto');

const getPerfil = async (req, res) => {
    try {
        const perfilId = req.params.id;
        const perfil = await perfilService.getPerfil(perfilId);

        if (!perfil) {
            return res.status(404).json({
                error: "Perfil no encontrado"
            });
        }

        const perfilDTO = toPerfilDTO(perfil);

        return res.status(200).json(perfilDTO);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const putPerfil = async (req, res) => {
    try {
        const perfilId = req.params.id;

        const perfilRequestDTO = {
            nombre_perfil: req.body.nombre_perfil,
            descripcion: req.body.descripcion,
            direccion: req.body.direccion,
            telefono: req.body.telefono,
            email: req.body.email,
            tipo_actor: req.body.tipo_actor,
        };

        const perfil = await perfilService.putPerfil(perfilId, perfilRequestDTO);

        if (!perfil) {
            return res.status(404).json({
                error: "Perfil no encontrado"
            });
        }

        const perfilDTO = toPerfilDTO(perfil);

        return res.status(200).json(perfilDTO);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getPerfil,
    putPerfil,
}

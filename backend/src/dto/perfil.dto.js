function toPerfilDTO(perfil) {
    return {
        nombre_perfil: perfil.nombre_perfil,
        imagen: perfil.imagen,
        descripcion: perfil.descripcion,
        direccion: perfil.direccion,
        telefono: perfil.telefono,
        email: perfil.email,
        tipo_actor: perfil.tipo_actor,
    };
}

module.exports = {
    toPerfilDTO,
};

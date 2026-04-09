function toUserCreateDTO(user) {
    if (!user) return null;

    return {
        id: user.id,
        username: user.username,
        rol: user.rol,
        fecha_registro: user.fecha_registro,
    };
}

function toUserDTO(user) {
    if (!user) return null;

    return {
        id: user.id,
        username: user.username,
        rol: user.rol,
        fecha_registro: user.fecha_registro,
        perfilId: user.perfil.id,
        nombrePerfil: user.perfil.nombre_perfil,
        imagen: user.perfil.imagen,
        email: user.perfil.email,
        tipoActor: user.perfil.tipo_actor,
        activo: user.activo,
    };
}

function toListUserDTO(users) {
    if (!Array.isArray(users)) return [];
    return users.map(toUserDTO);
}

module.exports = {
    toUserCreateDTO,
    toUserDTO,
    toListUserDTO,
};

function toUserCreateDTO(user) {
    if (!user) return null;

    return {
        id: user.id,
        username: user.username,
        rol: user.rol,
        fecha_registro: user.fecha_registro,
    };
}

module.exports = {
    toUserCreateDTO,
};

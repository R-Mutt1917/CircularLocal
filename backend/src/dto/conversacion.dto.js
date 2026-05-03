function toUserConversationsDTO(conversaciones) {
    return conversaciones.map(conversacion => {
        const miRelacion = conversacion.miRelacion?.[0];
        const otroUsuario = conversacion.participantes?.[0]?.User;
        const perfil = otroUsuario?.perfil;

        return {
            id: conversacion.id,
            ultimoMensaje: conversacion.ultimoMensaje,
            fechaActualizacion: conversacion.fechaActualizacion,

            cantidadNoLeidos: miRelacion?.cantidadNoLeidos ?? 0,
            fechaUltimoLeido: miRelacion?.fechaUltimoLeido ?? null,

            userId: otroUsuario?.id,
            nombrePerfil: perfil?.nombre_perfil ?? null,
            imagen: perfil?.imagen ?? null
        };
    });
}

module.exports = {
    toUserConversationsDTO,
};

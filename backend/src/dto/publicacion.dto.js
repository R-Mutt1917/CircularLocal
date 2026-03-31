//Nota:Cambie a Data Mapper para mantener la consistencia con el resto del backend
//(perfil, usuario) que usan funciones de mapeo plano.

function toPublicacionDTO(publicacion) {
    if (!publicacion) return null;

    let detalle = null;

    if (publicacion.Material) {
        detalle = {
            nombreMaterial: publicacion.Material.nombreMaterial,
            cantidad: publicacion.Material.cantidad,
            unidad: publicacion.Material.unidad,
        };
    }

    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        tag: publicacion.tag ? publicacion.tag.name : (publicacion.tagId || null),
        user_id: publicacion.user_id,
        createdAt: publicacion.createdAt || undefined,
        tipo: publicacion.tipo,
        detalle
    };
}

function toPublicacionListDTO(publicaciones) {
    if (!Array.isArray(publicaciones)) return [];
    return publicaciones.map(toPublicacionDTO);
}

module.exports = {
    toPublicacionDTO,
    toPublicacionListDTO
};
//class PublicacionDTO {
//        this.titulo = publicacion.titulo;
//        this.descripcion = publicacion.descripcion;
//        this.tag = publicacion.tag ? publicacion.tag.name : null; //
//        this.createdAt = publicacion.createdAt || undefined;
//    }
//}


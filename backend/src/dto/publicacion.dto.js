const { toPerfilDTO } = require('./perfil.dto');

function toDetalleDTO(publicacion) {
    let detalle = null;

    if (publicacion.Material) {
        detalle = {
            nombreMaterial: publicacion.Material.nombreMaterial,
            cantidad: publicacion.Material.cantidad,
            unidad: publicacion.Material.unidad,
        };
    } else if (publicacion.Producto) {
        detalle = {
            nombreProducto: publicacion.Producto.nombreProducto,
            cantidad: publicacion.Producto.cantidad,
            unidad: publicacion.Producto.unidad,
        };
    } else if (publicacion.Servicio) {
        detalle = {
            modalidad: publicacion.Servicio.modalidad,
            disponibilidadHoraria: publicacion.Servicio.disponibilidadHoraria,
            zonaCobertura: publicacion.Servicio.zonaCobertura
        };
    }

    return detalle;
}

function toPublicacionDTO(publicacion) {
    if (!publicacion) return null;

    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        tag: publicacion.tag ? publicacion.tag.name : (publicacion.tagId || null),
        user_id: publicacion.user_id,
        createdAt: publicacion.createdAt || undefined,
        tipo: publicacion.tipo,
        imagen: publicacion.imagen,
        estado: publicacion.estado,
        verificada: publicacion.verificada,
        reportada: publicacion.reportada,
        detalle: toDetalleDTO(publicacion)
    };
}

function toPublicacionListDTO(publicaciones) {
    if (!Array.isArray(publicaciones)) return [];
    return publicaciones.map(toPublicacionDTO);
}

function toPublicacionDetalleDTO(publicacion) {
    if (!publicacion) return null;

    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        tipo: publicacion.tipo,
        imagen: publicacion.imagen,
        estado: publicacion.estado,
        verificada: publicacion.verificada,
        reportada: publicacion.reportada,
        tag: publicacion.tag ? publicacion.tag.name : (publicacion.tagId || null),
        user_id: publicacion.user_id,
        createdAt: publicacion.createdAt || undefined,        
        verificada: publicacion.verificada,
        reportada: publicacion.reportada,
        detalle: toDetalleDTO(publicacion),
        user: publicacion.user ? {
            id: publicacion.user.id,
            perfil: publicacion.user.perfil ? toPerfilDTO(publicacion.user.perfil) : null
        } : null
    };
}

function toPublicacionPreviewDTO(publicacion) {
    if (!publicacion) return null;
    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        descripcion: publicacion.descripcion,
        tipo: publicacion.tipo,
        imagen: publicacion.imagen,
        estado: publicacion.estado,
        verificada: publicacion.verificada,
        reportada: publicacion.reportada,
        tag: publicacion.tag ? publicacion.tag.name : (publicacion.tagId || null),
        user_id: publicacion.user_id,
        createdAt: publicacion.createdAt || undefined,
        user: publicacion.user ? {
            id: publicacion.user.id,
            perfil: publicacion.user.perfil ? {
                nombre_perfil: publicacion.user.perfil.nombre_perfil,
                imagen: publicacion.user.perfil.imagen,
            } : null
        } : null
    };
}

function toPublicacionPreviewListDTO(publicaciones) {
    if (!Array.isArray(publicaciones)) return [];
    return publicaciones.map(toPublicacionPreviewDTO);
}

function toPublicacionReportadaDTO(publicacion) {
    if (!publicacion) return null;
    return {
        id: publicacion.id,
        titulo: publicacion.titulo,
        tipo: publicacion.tipo,
        createdAt: publicacion.createdAt,
        user: publicacion.user.id,
        nombrePerfil: publicacion.user.perfil.nombre_perfil,
        imagenPerfil: publicacion.user.perfil.imagen,
    };
}

function toPublicacionReportadaListDTO(publicaciones) {
    if (!publicaciones?.rows) return [];
    return publicaciones.rows.map(toPublicacionReportadaDTO);
}

module.exports = {
    toPublicacionDTO,
    toPublicacionListDTO,
    toPublicacionDetalleDTO,
    toPublicacionPreviewDTO,
    toPublicacionPreviewListDTO,
    toPublicacionReportadaDTO,
    toPublicacionReportadaListDTO,
};

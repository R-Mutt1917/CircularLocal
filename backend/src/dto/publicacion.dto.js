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

    if (publicacion.Producto) {
        detalle = {
            nombreProducto: publicacion.Producto.nombreProducto,
            cantidad: publicacion.Producto.cantidad,
            unidad: publicacion.Producto.unidad,
        };
    }

    if (publicacion.Servicio) {
        detalle = {
            modalidad: publicacion.Servicio.modalidad,
            disponibilidadHoraria: publicacion.Servicio.disponibilidadHoraria,
            zonaCobertura: publicacion.Servicio.zonaCobertura
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
        imagen: publicacion.imagen,
        estado: publicacion.estado,
        verificada: publicacion.verificada,
        reportada: publicacion.reportada,
        detalle
    };
}

function toPublicacionListDTO(publicaciones) {
    if (!Array.isArray(publicaciones)) return [];
    return publicaciones.map(toPublicacionDTO);
}

function toPublicacionDetalleDTO(publicacion) {
    if (!publicacion) return null;
    //lógica de detalle de toPublicacionDTO
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
        detalle,
        user: publicacion.user ? {
            id: publicacion.user.id,
            perfil: publicacion.user.perfil ? {
                nombre_perfil: publicacion.user.perfil.nombre_perfil,
                imagen: publicacion.user.perfil.imagen,
                descripcion: publicacion.user.perfil.descripcion,
                direccion: publicacion.user.perfil.direccion,
                telefono: publicacion.user.perfil.telefono,
                email: publicacion.user.perfil.email,
                tipo_actor: publicacion.user.perfil.tipo_actor,
            } : null
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


module.exports = {
    toPublicacionDTO,
    toPublicacionListDTO,
    toPublicacionDetalleDTO,
    toPublicacionPreviewDTO,
    toPublicacionPreviewListDTO
};
//class PublicacionDTO {
//        this.titulo = publicacion.titulo;
//        this.descripcion = publicacion.descripcion;
//        this.tag = publicacion.tag ? publicacion.tag.name : null; //
//        this.createdAt = publicacion.createdAt || undefined;
//    }
//}


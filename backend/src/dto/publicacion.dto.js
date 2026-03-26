class PublicacionDTO {
    constructor(publicacion) {
        this.titulo = publicacion.titulo;
        this.descripcion = publicacion.descripcion;
        this.tag = publicacion.tag ? publicacion.tag.name : null; // 
        this.createdAt = publicacion.createdAt || undefined;
    }
}
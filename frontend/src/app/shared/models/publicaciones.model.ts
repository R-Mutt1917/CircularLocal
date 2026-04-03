export type TipoPublicacion = 'MATERIAL' | 'PRODUCTO' | 'SERVICIO';

export interface DetalleMaterial {
    nombreMaterial: string;
    cantidad: number;
    unidad: string;
}

export interface DetalleProducto {
    nombreProducto: string;
    cantidad: number;
    unidad: string;
}

export interface DetalleServicio {
    modalidad: 'PRESENCIAL' | 'REMOTO' | 'MIXTO';
    disponibilidadHoraria: string;
    zonaCobertura: string;
}

export interface PublicacionModel {
    id: number;
    titulo: string;
    descripcion: string;
    tipo: TipoPublicacion;
    tag: string;
    user_id: number;
    createdAt: string;
    detalle: DetalleMaterial | DetalleProducto | DetalleServicio | null;

    // Estos campos NO están en el DTO actual del backend, 
    // agregarlos allá para que funcione correctamente
    estado?: string;
    imagenPrincipal?: string;
}


export interface CrearPublicacionModel {
    titulo: string;
    descripcion: string;
    categoria: string;
    tipo: TipoPublicacion;
    imagen: File | string | null;
    detalle: DetalleMaterial | DetalleProducto | DetalleServicio;
}

export interface PublicacionPreviewModel {
    id: number;
    titulo: string;
    imagenPrincipal: string;
    estado: string;
    tipo: string;
    tagId: number;
    user_id: number;
    createdAt: string;
    tag: {
        id: number;
        nombre: string;
    };
    user: {
        id: number;
        perfil: {
            nombre_perfil: string;
            imagen: string;
        };
    };
}

export interface PublicacionDetalleModel {
    id: number;
    titulo: string; // len: [5, 255]
    descripcion: string;
    tipo: string; // 'material', 'producto', 'servicio'
    fechaCreacion: string;
    fechaActualizacion: string;
    fechaFinalizacion: string | null;
    fechaEliminacion: string | null;
    estado: string; // 'borrador', 'publicada', 'finalizada', 'cancelada'
    imagenPrincipal: string;
    verificada: boolean;
    reportada: boolean;
    tag: {
        id: number;
        nombre: string;
    };
    user: {
        id: number;
        perfil: {
            nombre_perfil: string;
            imagen: string;
            descripcion: string;
            direccion: string;
            telefono: string;
            email: string;
            tipo_actor: string;
        };
    };
}

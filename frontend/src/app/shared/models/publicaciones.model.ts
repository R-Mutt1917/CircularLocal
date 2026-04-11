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
    tagId: number;
    tag: string;
    user_id: number;
    createdAt: string;
    detalle: DetalleMaterial | DetalleProducto | DetalleServicio | null;
    estado: string;
    imagen: string;
    verificada: boolean;
    reportada: boolean;
}


export interface CrearPublicacionModel {
    titulo: string;
    descripcion: string;
    tagId: number;
    tipo: TipoPublicacion;
    imagen: string | null;
    estado: string;
    detalle: DetalleMaterial | DetalleProducto | DetalleServicio;
}

export interface PublicacionPreviewModel {
    id: number;
    titulo: string;
    imagen: string;
    estado: string;
    descripcion: string;
    tipo: string;
    tag: string;
    user_id: number;
    createdAt: string;
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
    titulo: string;
    descripcion: string;
    tipo: string;
    estado: string;
    imagen: string;
    verificada: boolean;
    reportada: boolean;
    createdAt: string | undefined;
    user_id: number;
    tag: string;
    detalle: DetalleMaterial | DetalleProducto | DetalleServicio | null;
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
        } | null;
    } | null;
}

export interface PublicacionAdmin {
    id: number;
    titulo: string;
    tipo: string;
    createdAt: string;
    user: number;
    nombrePerfil: string;
    imagenPerfil: string | null;
}
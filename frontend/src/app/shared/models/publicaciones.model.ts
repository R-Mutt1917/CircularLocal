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
export interface PublicacionModel {
    id: number;
    titulo: string; // len: [5, 255]
    descripcion: string;
    tipo: string; // 'material', 'producto', 'servicio'
    tag: string; // 'Madera Recup.', 'Textiles Orgánicos', 'Cerámica', 'Herramientas', 'Metalurgia'
    fechaCreacion: string;
    fechaActualizacion: string;
    fechaFinalizacion: string | null;
    fechaEliminacion: string | null;
    estado: string; // 'borrador', 'publicada', 'finalizada', 'cancelada'
    imagenPrincipal: string;
    verificada: boolean;
    reportada: boolean;
}

export interface CrearPublicacionModel {
    titulo: string;
    descripcion: string;
    categoria: string;
    tipo: string;
    imagen: File | null;
}

export interface PublicacionPreviewModel {
    id: number;
    titulo: string;
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
    titulo: string;
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
            descripcion: string;
            direccion: string;
            telefono: string;
            email: string;
            tipo_actor: string;
        };
    };
}

export interface Publicaciones {
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
export interface SolicitudModel {
    id: number;
    solicitanteId: number;
    solicitante?: {
        id: number;
        username: string;
    };
    publicacionId: number;
    mensajeInicial: string;
    fechaCreacion: string;
    estadoSolicitud: 'pendiente' | 'aceptada' | 'rechazada' | 'cancelada';
}

export interface CrearSolicitudModel {
    publicacionId: number;
    mensajeInicial: string;
}

export interface SolicitudPendienteModel {
    solicitudId: number;
    titulo: string;
    imagen: string;
    mensaje: string;
    estado: string;
    fechaCreacion: string;
    solicitante?: {
        id: number;
        username: string;
    };
}

export interface SolicitudEnviadaModel {
    solicitudId: number;
    titulo: string;
    imagen: string;
    mensaje: string;
    estado: string;
    fechaCreacion: string;
    receptor?: {
        id: number;
        username: string;
    };
}
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
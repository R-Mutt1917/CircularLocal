export interface SolicitudModel {
    solicitanteId: number;
    publicacionId: number;
    mensajeInicial: string;
    fechaCreacion: string;
    estadoSolicitud: string; // 'pendiente', 'aceptada', 'rechazada', 'cancelada'
}

export interface CrearSolicitudModel {
    publicacionId: number;
    mensajeInicial: string;
}
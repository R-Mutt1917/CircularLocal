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

export interface SolicitudPendienteModel{
    solicitudId:number
    titulo:string
    solicitante:string
    imagen:string
    mensaje:string
    estado:'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'CANCELADA'
    fecha:string
}

export interface SolicitudEnviadaModel{
    solicitudId:number
    titulo:string
    receptor:string
    imagen:string
    mensaje:string
    estado:'PENDIENTE' | 'ACEPTADA' | 'RECHAZADA' | 'CANCELADA'
    fecha:string
}


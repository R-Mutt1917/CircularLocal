export interface Mensaje{
  id:number
  mensaje:string
  userId:number
  conversationId:number
  fechaEnvio:Date
}

export interface Intercambio {
  id: number;
  estadoIntercambio: 'EN_PROCESO' | 'COMPLETADO' | 'CANCELADO';
  confirmadoSolicitante: boolean;
  confirmadoPublicador: boolean;
}

export interface Conversacion {
  cantidadNoLeidos: number;
  fechaActualizacion: Date;
  fechaUltimoLeido: Date | null;
  id: number;
  imagen: string | null;
  nombrePerfil: string | null;
  ultimoMensaje: string | null;
  userId: number;
  intercambio?: Intercambio;
}



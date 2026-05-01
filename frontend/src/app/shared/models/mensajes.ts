export interface Mensaje{
  id:number
  mensaje:string
  userId:number
  conversationId:number
  fechaEnvio:Date
}

export interface Conversacion{
    id:number
    ultimoMensaje:string
    fechaActualizacion:Date
    conversacionesUsuarios:ConversacionUsuarios[] 
    solicitanteId: number
}

export interface ConversacionUsuarios{
    cantidadNoLeidos:number
    fechaUltimoLeido:Date | null
    
}


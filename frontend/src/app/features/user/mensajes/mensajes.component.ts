import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/core/services/websocket.service';
import { MensajesService } from 'src/app/core/services/mensajes.service';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit {
  mensajes: any[] = [];
  nuevoMensaje: string = '';
  conversacionId: number = 0;

  constructor(private webSocketService: WebSocketService, private mensajesService: MensajesService) {}

  ngOnInit(): void {
    this.cargarMensajes();

    this.webSocketService.joinConversacion(this.conversacionId); // Unirse a la conversación

    this.webSocketService.getMessages().subscribe((mensaje: any) => {
      if (mensaje) {
        console.log('Mensaje recibido en el componente:', mensaje);
        this.mensajes.push(mensaje); // Agrega el mensaje recibido
      }
    });
  }

  cargarMensajes(): void {
    this.mensajesService.getMensajes(this.conversacionId).subscribe((mensajes: any[]) => {
      this.mensajes = mensajes;
    });
  }

  enviarMensaje(): void {
    const mensaje: string = this.nuevoMensaje.trim();
    if (mensaje) {
      this.mensajesService.enviarMensaje(this.conversacionId, mensaje).subscribe((nuevoMensaje: any) => {
        this.mensajes.push(nuevoMensaje); // Agrega el mensaje enviado
        this.nuevoMensaje = ''; // Limpia el campo de entrada
      });
    }
  }
}
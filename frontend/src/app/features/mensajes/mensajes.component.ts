import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { NavUser } from '../../layout/user-layout/nav-user/nav-user';
import { ChatService } from '../../core/services/chat.service';
import { WebSocketService } from '../../core/services/websocket.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, NavUser],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnInit, OnDestroy {
  mensajes: any[] = [];
  conversacionId: number = 0;
  private sub!: Subscription;

  constructor(
    private chatService: ChatService,
    private wsService: WebSocketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Leer el id de conversación de la URL: /app/mensajes?conversacion=5
    this.route.queryParams.subscribe(params => {
      const id = Number(params['conversacion']);
      if (id) {
        this.conversacionId = id;
        this.wsService.joinConversacion(this.conversacionId);
      }
    });

    this.sub = this.chatService.getMessages().subscribe((mensaje: any) => {
      if (mensaje) this.mensajes.push(mensaje);
    });
  }

  enviarMensaje(contenido: string): void {
    if (!contenido.trim() || !this.conversacionId) return;
    this.chatService.sendMessage(this.conversacionId, contenido);
  }

  ngOnDestroy(): void {
    if (this.conversacionId) {
      this.wsService.leaveConversacion(this.conversacionId);
    }
    this.sub.unsubscribe();
  }
}
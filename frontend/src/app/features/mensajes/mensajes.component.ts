import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavUser } from '../../layout/user-layout/nav-user/nav-user';
import { ChatService } from '../../core/services/chat.service';
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
  private sub!: Subscription;

  // Por ahora hardcodeado — después vendrá de la ruta o del estado
  conversacionId = 1;
  destinatarioId = 2;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.sub = this.chatService.getMessages().subscribe((mensaje: any) => {
      if (mensaje) {
        this.mensajes.push(mensaje);
      }
    });
  }

  enviarMensaje(contenido: string): void {
    if (!contenido.trim()) return;
    this.chatService.sendMessage(
      this.conversacionId,
      contenido,
      this.destinatarioId
    );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavUser } from '../../layout/user-layout/nav-user/nav-user';
import { ChatService } from 'src/app/core/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [CommonModule, NavUser],
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.scss']
})
export class MensajesComponent implements OnDestroy {
  mensajes: any[] = [];
  private sub!: Subscription;

  constructor(private chatService: ChatService) {
    this.sub = this.chatService.getMessages().subscribe((mensaje) => {
      if (mensaje) {
        this.mensajes.push(mensaje);
      }
    });
  }

  enviarMensaje(contenido: string): void {
    const conversationId = 1;
    this.chatService.sendMessage(conversationId, contenido);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
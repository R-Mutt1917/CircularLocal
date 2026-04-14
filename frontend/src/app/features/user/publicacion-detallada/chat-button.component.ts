import { Component, Input } from '@angular/core';
import { ChatService } from 'src/app/core/services/chat.service';

@Component({
  selector: 'app-chat-button',
  template: `<button (click)="startChat()">Iniciar Chat</button>`
})
export class ChatButtonComponent {
  @Input() conversationId!: number;

  constructor(private chatService: ChatService) {}

  startChat(): void {
    this.chatService.sendMessage(this.conversationId, 'Hola, quiero iniciar un chat.');
  }
}
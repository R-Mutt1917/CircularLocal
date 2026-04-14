import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private webSocketService: WebSocketService) {}

  sendMessage(conversationId: number, content: string): void {
    const message = { conversationId, content };
    this.webSocketService.sendMessage(message);
  }

  getMessages(): Observable<any> {
    return this.webSocketService.getMessages();
  }
}
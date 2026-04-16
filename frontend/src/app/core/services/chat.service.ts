import { Injectable } from '@angular/core';
import { WebSocketService } from './websocket.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private webSocketService: WebSocketService) {}

  sendMessage(conversacionId: number, contenido: string): void {
    this.webSocketService.sendMessage({ conversacionId, contenido });
  }

  getMessages(): Observable<any> {
    return this.webSocketService.getMessages();
  }
}
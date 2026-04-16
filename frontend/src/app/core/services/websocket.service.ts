import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private messageSubject = new BehaviorSubject<any>(null);

  connect(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('WebSocket: no hay token');
      return;
    }
    if (this.socket?.connected) return;

    this.socket = io(environment.socketUrl, { auth: { token } });

    this.socket.on('connect', () => console.log('WebSocket conectado'));
    this.socket.on('connect_error', (err) => console.error('WebSocket error:', err));
    this.socket.on('disconnect', () => console.warn('WebSocket desconectado'));

    this.socket.on('receive-message', (mensaje: any) => {
    console.log('Mensaje recibido del servidor:', mensaje); // Log para depuración
    this.messageSubject.next(mensaje);
  });
  }

  joinConversacion(conversacionId: number): void {
    this.socket?.emit('join-conversacion', conversacionId);
  }

  leaveConversacion(conversacionId: number): void {
    this.socket?.emit('leave-conversacion', conversacionId);
  }

  sendMessage(conversacionId: number, message: string): void {
    if (this.socket?.connected) {
      this.socket.emit('send-message', { conversacionId, mensaje: message });
    } else {
      console.error('WebSocket: no conectado');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    this.socket?.disconnect();
  }
}
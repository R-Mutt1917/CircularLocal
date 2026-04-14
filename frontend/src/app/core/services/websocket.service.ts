import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket!: Socket;
  private messageSubject = new BehaviorSubject<any>(null);

  // Ya NO conecta en el constructor — espera a que AuthServices llame connect()
  connect(): void {
    const token = localStorage.getItem('token');
    if (!token) {
      console.warn('WebSocket: no hay token, conexión cancelada.');
      return;
    }
    if (this.socket?.connected) return; // evitar doble conexión

    this.socket = io(environment.socketUrl, { auth: { token } });

    this.socket.on('connect', () => console.log('WebSocket conectado'));
    this.socket.on('connect_error', (err) => console.error('WebSocket error:', err));
    this.socket.on('disconnect', () => console.warn('WebSocket desconectado'));
    this.socket.on('receive-message', (message) => {
      this.messageSubject.next(message);
    });
  }

  sendMessage(message: any): void {
    if (this.socket?.connected) {
      this.socket.emit('send-message', message);
    } else {
      console.error('WebSocket: no conectado, mensaje no enviado.');
    }
  }

  getMessages(): Observable<any> {
    return this.messageSubject.asObservable();
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
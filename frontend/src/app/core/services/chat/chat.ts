import { Injectable, OnDestroy } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../../../environments/environment';
import { Subject, Observable } from 'rxjs';
import { Mensaje } from '../../../shared/models/mensajes';

@Injectable({ providedIn: 'root' })
export class ChatService implements OnDestroy {
  private socket: Socket | null = null;
  private currentConversationId: number | null = null;

  private newMessage$ = new Subject<Mensaje>();
  private userReading$ = new Subject<{ userId: number }>();
  private connectionError$ = new Subject<string>();

  /** Conecta al servidor de sockets con el JWT del usuario */
  connect(): void {
    if (this.socket?.connected) return;

    const token = localStorage.getItem('token');
    if (!token) {
      this.connectionError$.next('No hay token de autenticación');
      return;
    }

    this.socket = io(environment.socketUrl, {
      auth: { token },
      transports: ['websocket', 'polling'],
    });

    this.socket.on('connect', () => {
      console.log('🟢 Socket conectado');
      // Si había una conversación activa, re-join
      if (this.currentConversationId) {
        this.joinConversation(this.currentConversationId);
      }
    });

    this.socket.on('new_message', (mensaje: Mensaje) => {
      this.newMessage$.next(mensaje);
    });

    this.socket.on('user_reading', (data: { userId: number }) => {
      this.userReading$.next(data);
    });

    this.socket.on('connect_error', (err) => {
      console.error('🔴 Error de conexión socket:', err.message);
      this.connectionError$.next(err.message);
    });

    this.socket.on('error', (data: { message: string }) => {
      console.error('🔴 Error socket:', data.message);
      this.connectionError$.next(data.message);
    });

    this.socket.on('disconnect', (reason) => {
      console.log('🔴 Socket desconectado:', reason);
    });
  }

  /** Se une a la room de una conversación */
  joinConversation(conversationId: number): void {
    this.currentConversationId = conversationId;
    if (this.socket?.connected) {
      this.socket.emit('join_conversation', { conversationId });
    }
  }

  /** Envía un mensaje a la conversación actual */
  sendMessage(conversationId: number, mensaje: string): void {
    if (!this.socket?.connected) {
      console.error('Socket no conectado, intentando reconectar...');
      this.connect();
      return;
    }
    this.socket.emit('send_message', { conversationId, mensaje });
  }

  /** Observable de nuevos mensajes entrantes */
  onNewMessage(): Observable<Mensaje> {
    return this.newMessage$.asObservable();
  }

  /** Observable de usuario leyendo */
  onUserReading(): Observable<{ userId: number }> {
    return this.userReading$.asObservable();
  }

  /** Observable de errores de conexión */
  onConnectionError(): Observable<string> {
    return this.connectionError$.asObservable();
  }

  /** Desconecta el socket */
  disconnect(): void {
    this.currentConversationId = null;
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
    this.newMessage$.complete();
    this.userReading$.complete();
    this.connectionError$.complete();
  }
}
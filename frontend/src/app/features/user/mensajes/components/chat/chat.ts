import {
  Component,
  inject,
  input,
  OnInit,
  OnDestroy,
  OnChanges,
  signal,
  ElementRef,
  viewChild,
  effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ChatService } from '../../../../../core/services/chat/chat';
import { MensajeService } from '../../../../../core/services/mensajesService/mensaje';
import { AuthServices } from '../../../../../core/services/auth';
import { IntercambiosServices } from '../../../../../core/services/intercambiosServices/intercambios-services';
import { Conversacion, Mensaje, Intercambio, PublicacionIntercambio } from '../../../../../shared/models/mensajes';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnInit, OnDestroy, OnChanges {
  conversacion = input.required<any>();

  private chatService = inject(ChatService);
  private mensajeService = inject(MensajeService);
  private authService = inject(AuthServices);
  private intercambioService = inject(IntercambiosServices);

  mensajes = signal<Mensaje[]>([]);
  nuevoMensaje = '';
  userId: number = 0;
  isTyping = signal(false);
  cargando = signal(true);

  intercambio = signal<Intercambio | null>(null);
  publicacion = signal<PublicacionIntercambio | null>(null);


  private messagesContainer = viewChild<ElementRef>('messagesContainer');
  private subs: Subscription[] = [];

  constructor() {
    // Auto-scroll cuando cambian los mensajes
    effect(() => {
      this.mensajes();
      setTimeout(() => this.scrollToBottom(), 50);
    });
  }

  ngOnInit(): void {
    this.userId = this.authService.getId();
    this.chatService.connect();

    this.subs.push(
      this.chatService.onNewMessage().subscribe((mensaje) => {
        this.mensajes.update((msgs) => [...msgs, mensaje]);
      })
    );

    this.subs.push(
      this.chatService.onUserReading().subscribe(() => {
        this.isTyping.set(true);
        setTimeout(() => this.isTyping.set(false), 2000);
      })
    );

    this.cargarDatos();

  }

  ngOnChanges(): void {
    this.cargarDatos();
  }

  private cargarDatos(): void {
    const conv = this.conversacion();
    if (!conv) return;

    this.cargando.set(true);
    this.mensajes.set([]);
    this.intercambio.set(conv.intercambio || null);
    console.log("el intercambio", conv)

    this.publicacion.set(conv.intercambio?.solicitud.publicacion || null);
    console.log("la publicacion", this.publicacion())
    
    this.chatService.joinConversation(conv.id);

    this.mensajeService.obtenerMensajes(conv.id).subscribe({
      next: (data) => {
        this.mensajes.set(data);
        this.cargando.set(false);
      },
      error: () => {
        this.cargando.set(false);
      },
    });
  }

  enviarMensaje(): void {
    const texto = this.nuevoMensaje.trim();
    if (!texto) return;

    const conv = this.conversacion();
    if (!conv) return;

    this.chatService.sendMessage(conv.id, texto);
    this.nuevoMensaje = '';
  }

  onKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.enviarMensaje();
    }
  }

  formatHora(fecha: Date | string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    return d.toLocaleTimeString('es-AR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  esMensajePropio(mensaje: Mensaje): boolean {
    return mensaje.userId === this.userId;
  }

  private scrollToBottom(): void {
    const container = this.messagesContainer();
    if (container) {
      const el = container.nativeElement;
      el.scrollTop = el.scrollHeight;
    }
  }

  ngOnDestroy(): void {
    this.subs.forEach((s) => s.unsubscribe());
  }

  confirmarIntercambio(): void {
    const inter = this.intercambio();
    if (!inter) return;

    this.intercambioService.confirmarIntercambio(inter.id).subscribe({
      next: (data) => {
        this.intercambio.set(data);
        console.log('Intercambio confirmado');
      },
      error: (err) => console.error('Error al confirmar intercambio', err)
    });
  }

  cancelarIntercambio(): void {
    const inter = this.intercambio();
    if (!inter) return;

    if (confirm('¿Estás seguro que querés cancelar el intercambio?')) {
      this.intercambioService.cancelarIntercambio(inter.id).subscribe({
        next: (data) => {
          this.intercambio.set(data);
          console.log('Intercambio cancelado');
        },
        error: (err) => console.error('Error al cancelar intercambio', err)
      });
    }
  }

  
}
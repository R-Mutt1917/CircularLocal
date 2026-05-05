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
import { Conversacion, Mensaje, Intercambio } from '../../../../../shared/models/mensajes';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.html',
  styleUrl: './chat.scss',
})
export class Chat implements OnInit, OnDestroy, OnChanges {
  conversacion = input.required<Conversacion>();

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
    const int = this.intercambio();
    if (!int) return;

    this.intercambioService.confirmarIntercambio(int.id).subscribe({
      next: () => {
        // Recargar el estado del intercambio o actualizar localmente
        // Por ahora refrescamos los datos de la conversación si fuera necesario
        // O simplemente actualizamos el estado local si sabemos que funcionó
        this.actualizarEstadoLocal('CONFIRMAR');
      }
    });
  }

  cancelarIntercambio(): void {
    const int = this.intercambio();
    if (!int) return;

    if (confirm('¿Estás seguro de que querés cancelar el intercambio?')) {
      this.intercambioService.cancelarIntercambio(int.id).subscribe({
        next: () => {
          this.actualizarEstadoLocal('CANCELAR');
        }
      });
    }
  }

  private actualizarEstadoLocal(accion: 'CONFIRMAR' | 'CANCELAR'): void {
    const current = this.intercambio();
    if (!current) return;

    if (accion === 'CANCELAR') {
      this.intercambio.set({ ...current, estadoIntercambio: 'CANCELADO' });
      return;
    }

    // Aquí deberíamos saber si somos solicitante o publicador. 
    // Pero como el backend ya lo maneja, lo mejor sería volver a pedir el estado
    // o simplemente mostrar que "Confirmaste".
    // Por simplicidad en este paso, asumimos que refrescamos los datos.
    const conv = this.conversacion();
    this.intercambioService.intercambioPendiente(current.id).subscribe(data => {
      this.intercambio.set(data);
    });
  }

  yaConfirme(): boolean {
    const int = this.intercambio();
    const conv = this.conversacion();
    if (!int || !conv) return false;

    // Si el usuario del chat es el dueño del perfil que estamos viendo (userId en conversacion),
    // entonces en esta vista "miRelacion" es el otro? No, userId en la interfaz Conversacion 
    // suele ser el ID del otro participante en estos sistemas.
    
    // Vamos a usar una lógica más segura: comparamos contra el solicitanteId si tuviéramos esa info.
    // Por ahora, el backend nos devuelve confirmadoSolicitante y confirmadoPublicador.
    // Necesitamos saber si somos el solicitante o el publicador.
    return false; // Implementaremos esto mejor con más info.
  }
}
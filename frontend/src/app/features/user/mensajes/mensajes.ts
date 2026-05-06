import { Component, inject, OnInit, OnDestroy, signal, computed } from '@angular/core';
import { MensajeService } from '../../../core/services/mensajesService/mensaje';
import { ChatService } from '../../../core/services/chat/chat';
import { Conversacion } from '../../../shared/models/mensajes';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Chat } from './components/chat/chat';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mensajes',
  standalone: true,
  imports: [ReactiveFormsModule, Chat, CommonModule],
  templateUrl: './mensajes.html',
  styleUrl: './mensajes.scss',
})
export class Mensajes implements OnInit, OnDestroy {
  private mensajeService = inject(MensajeService);
  private chatService = inject(ChatService);

  conversaciones = signal<Conversacion[]>([]);
  searchControl = new FormControl('');
  searchTerm = signal('');
  conversacionSeleccionada = signal<Conversacion | null>(null);
  private subs: Subscription[] = [];

  conversacionesFiltradas = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this.conversaciones().filter(c =>
      c.nombrePerfil?.toLowerCase().includes(term)
    );
  });

  ngOnInit(): void {
    this.mensajeService.obtenerConversaciones().subscribe((data) => {
      this.conversaciones.set(data);
      console.log("conversaciones:",data);
    });

    this.subs.push(
      this.searchControl.valueChanges.subscribe(value => {
        this.searchTerm.set(value || '');
      })
    );

    // Actualizar la lista cuando llega un mensaje nuevo
    this.subs.push(
      this.chatService.onNewMessage().subscribe((msg) => {
        this.conversaciones.update(convs =>
          convs.map(c => {
            if (c.id === msg.conversationId) {
              return {
                ...c,
                ultimoMensaje: msg.mensaje,
                fechaActualizacion: msg.fechaEnvio,
              };
            }
            return c;
          })
        );
      })
    );
  }

  seleccionarConversacion(conv: Conversacion): void {
    this.conversacionSeleccionada.set(conv);
  }

  convertirFecha(fecha: Date | string): string {
    if (!fecha) return '';
    const d = new Date(fecha);
    const hoy = new Date();

    if (d.toDateString() === hoy.toDateString()) {
      return d.toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    }

    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    if (d.toDateString() === ayer.toDateString()) {
      return 'Ayer';
    }

    return d.toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit' });
  }

  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe());
    this.chatService.disconnect();
  }
}

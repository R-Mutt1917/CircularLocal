import { Component, input, OnInit, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-solicitud',
  imports: [CommonModule],
  templateUrl: './card-solicitud.html',
  styleUrl: './card-solicitud.scss',
})
export class CardSolicitud implements OnInit {
  solicitud = input.required<any>();
  tipo = input<'recibidas' | 'enviadas'>('recibidas');

  ngOnInit(): void {
    console.log(this.solicitud());
  }

  aceptar = output<number>();
  rechazar = output<number>();
  cancelar = output<number>();
 
  onAceptar() {
    const id = this.solicitud().solicitudId;
    this.aceptar.emit(id);
  }
 
  onRechazar() {
    const id = this.solicitud().solicitudId;
    this.rechazar.emit(id);
  }
  
  onCancelar() {
    const id = this.solicitud().solicitudId;
    this.cancelar.emit(id);
  }
 
  get esPendiente(): boolean {
    return this.solicitud().estado === 'PENDIENTE';
  }
}

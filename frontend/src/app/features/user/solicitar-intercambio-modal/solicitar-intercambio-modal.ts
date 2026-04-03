import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SolicitudesService } from '../../../core/services/solicitudesServices/solicitudes';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-solicitar-intercambio-modal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './solicitar-intercambio-modal.html',
  styleUrls: ['./solicitar-intercambio-modal.scss']
})
export class SolicitarIntercambioModalComponent {

  @Input() publicacionId!: number;
  @Output() cerrar = new EventEmitter<void>();

  mensajeInicial = '';

  constructor(private solicitudesService: SolicitudesService) {}

  enviarSolicitud(): void {
    this.solicitudesService.crearSolicitud({
      publicacionId: this.publicacionId,
      mensajeInicial: this.mensajeInicial
    }).subscribe({
      next: () => {
        alert('Solicitud enviada');
        this.cerrar.emit();
      },
      error: () => {
        alert('Error al enviar solicitud');
      }
    });
  }
}
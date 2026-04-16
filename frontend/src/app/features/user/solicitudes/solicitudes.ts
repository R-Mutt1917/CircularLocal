import { Component, inject, OnInit, signal } from '@angular/core';
import { CardSolicitud } from './components/card-solicitud/card-solicitud';
import { SolicitudEnviadaModel, SolicitudPendienteModel } from '../../../shared/models/solicitudes.model';
import { SolicitudesService } from '../../../core/services/solicitudesServices/solicitudes';
import { Router } from '@angular/router';

type Tab = 'recibidas' | 'enviadas';

@Component({
  selector: 'app-solicitudes',
  imports: [CardSolicitud],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})
export class Solicitudes implements OnInit {

  private solicitudesService = inject(SolicitudesService);
  private router = inject(Router);

  tabActiva = signal<Tab>('recibidas');
  solicitudesRecibidas = signal<SolicitudPendienteModel[]>([]);
  solicitudesEnviadas = signal<SolicitudEnviadaModel[]>([]);

  ngOnInit(): void {
    this.solicitudesService.obtenerSolicitudesPendientes().subscribe({
      next: (solicitudes) => {
        this.solicitudesRecibidas.set(solicitudes);
      },
      error: (error) => {
        console.error('Error al obtener las solicitudes pendientes:', error);
      }
    });

    this.solicitudesService.solicitudesEnviadas().subscribe({
      next: (solicitudes) => {
        this.solicitudesEnviadas.set(solicitudes);
      },
      error: (error) => {
        console.error('Error al obtener las solicitudes enviadas:', error);
      }
    });
  }

  get solicitudesActivas(): SolicitudPendienteModel[] | SolicitudEnviadaModel[] {
    return this.tabActiva() === 'recibidas'
      ? this.solicitudesRecibidas()
      : this.solicitudesEnviadas();
  }

  get cantidadPendientesRecibidas(): number {
    return this.solicitudesRecibidas().filter(s => s.estado === 'PENDIENTE').length;
  }

  cambiarTab(tab: Tab) {
    this.tabActiva.set(tab);
  }

  onAceptar(id: number) {
    this.solicitudesService.aceptarSolicitud(id).subscribe({
      next: (response) => {
        alert('Solicitud aceptada');
        this.router.navigate([`/app/mensajes`], { queryParams: { conversacion: response.conversacionId } });
        this.solicitudesRecibidas.update(solicitudes => solicitudes.filter(s => s.solicitudId !== id));
      },
      error: (error) => {
        console.error('Error al aceptar la solicitud:', error);
      }
    });
  }

  onRechazar(id: number) {
    this.solicitudesService.rechazarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud rechazada');
        this.solicitudesRecibidas.update(solicitudes => solicitudes.filter(s => s.solicitudId !== id));
      },
      error: (error) => {
        console.error('Error al rechazar la solicitud:', error);
      }
    });
  }

  onCancelar(id: number) {
    this.solicitudesService.cancelarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud cancelada');
        this.solicitudesEnviadas.update(solicitudes => solicitudes.filter(s => s.solicitudId !== id));
      },
      error: (error) => {
        console.error('Error al cancelar la solicitud:', error);
      }
    });
  }
}
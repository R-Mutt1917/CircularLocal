<<<<<<< HEAD
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SolicitudesService } from '../../../core/services/solicitudesServices/solicitudes';
import { SolicitudModel } from '../../../shared/models/solicitudes.model';
import { NavUser } from '../../../layout/user-layout/nav-user/nav-user';

@Component({
  selector: 'app-solicitudes',
  standalone: true,
  imports: [CommonModule, NavUser],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss'
})
export class Solicitudes implements OnInit {
  private solicitudesService = inject(SolicitudesService);
  private router = inject(Router);

  solicitudes: SolicitudModel[] = [];
  cargando = false;

  ngOnInit(): void {
    this.cargarSolicitudes();
  }

  cargarSolicitudes(): void {
    this.cargando = true;
    this.solicitudesService.obtenerSolicitudesPendientes().subscribe({
      next: (data) => {
        this.solicitudes = data;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error al cargar solicitudes', err);
        this.cargando = false;
      }
    });
  }

  aceptar(solicitudId: number): void {
    this.solicitudesService.aceptarSolicitud(solicitudId).subscribe({
      next: (res) => {
        // Redirigir al chat con el id de la conversación creada
        this.router.navigate(['/app/mensajes'], {
          queryParams: { conversacion: res.conversacionId }
        });
      },
      error: (err) => console.error('Error al aceptar solicitud', err)
    });
  }

  rechazar(solicitudId: number): void {
    this.solicitudesService.rechazarSolicitud(solicitudId).subscribe({
      next: () => this.cargarSolicitudes(),
      error: (err) => console.error('Error al rechazar solicitud', err)
    });
=======
import { Component, inject, OnInit, signal } from '@angular/core';
import { CardSolicitud } from './components/card-solicitud/card-solicitud';
import { SolicitudEnviadaModel, SolicitudPendienteModel } from '../../../shared/models/solicitudes.model';
import { SolicitudesService } from '../../../core/services/solicitudesServices/solicitudes';

type Tab = 'recibidas' | 'enviadas';


@Component({
  selector: 'app-solicitudes',
  imports: [CardSolicitud],
  templateUrl: './solicitudes.html',
  styleUrl: './solicitudes.scss',
})
export class Solicitudes implements OnInit {

  private solicitudesService = inject(SolicitudesService);

  tabActiva = signal<Tab>('recibidas');
  solicitudesRecibidas = signal<SolicitudPendienteModel[]>([]);
  solicitudesEnviadas = signal<SolicitudEnviadaModel[]>([]);

 ngOnInit(): void {
   this.solicitudesService.solicitudesPendientes().subscribe({
    next: (solicitudes) => {
      console.log(solicitudes);
      this.solicitudesRecibidas.set(solicitudes);
    },
    error: (error) => {
      console.error('Error al obtener las solicitudes pendientes:',error);
    }
   })

   this.solicitudesService.solicitudesEnviadas().subscribe({
    next: (solicitudes) => {
      console.log(solicitudes);
      this.solicitudesEnviadas.set(solicitudes);
    },
    error: (error) => {
      console.error('Error al obtener las solicitudes enviadas:',error);
    }
   })
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
      next: () => {
        alert('Solicitud aceptada');
        this.solicitudesRecibidas.update(solicitudes => solicitudes.filter(s => s.solicitudId !== id));
      },
      error: (error) => {
        alert('Error al aceptar la solicitud');
        console.error('Error al aceptar la solicitud:',error);
      }
    })
  }
 
  onRechazar(id: number) {
    this.solicitudesService.rechazarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud rechazada');
        this.solicitudesRecibidas.update(solicitudes => solicitudes.filter(s => s.solicitudId !== id));
      },
      error: (error) => {
        alert('Error al rechazar la solicitud');
        console.error('Error al rechazar la solicitud:',error);
      }
    })
  }

  onCancelar(id: number) {
    this.solicitudesService.cancelarSolicitud(id).subscribe({
      next: () => {
        alert('Solicitud cancelada');
        this.solicitudesEnviadas.update(solicitudes => solicitudes.filter(s => s.solicitudId !== id));
      },
      error: (error) => {
        alert('Error al cancelar la solicitud');
        console.error('Error al cancelar la solicitud:',error);
      }
    })
>>>>>>> origin/develop
  }
}
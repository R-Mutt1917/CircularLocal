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
  }
}
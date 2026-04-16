import { Component, inject, OnInit } from '@angular/core';
import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
import { PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
import { AuthServices } from '../../../core/services/auth';
import { SolicitudesService } from '../../../core/services/solicitudesServices/solicitudes';
import { IntercambiosServices } from '../../../core/services/intercambiosServices/intercambios-services';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class UserDashboard implements OnInit {
  private publicacionesService = inject(PublicacionesService);
  private authService = inject(AuthServices);
  private solicitudesService = inject(SolicitudesService);
  private intercambiosService = inject(IntercambiosServices);

  publicaciones: PublicacionPreviewModel[] = [];
  cantidadPublicaciones: number = 0;
  ultimasPublicaciones: PublicacionPreviewModel[] = [];
  username: string | null = this.authService.userName();
  cantidadSolicitudesPendientes: number = 0;
  cantidadIntercambiosCompletados: number = 0;

  ngOnInit() {
    this.cargarPublicaciones();
    this.cargarSolicitudesPendientes();
    this.cargarIntercambiosCompletados();
  }

  private cargarPublicaciones() {
    const getId: number = this.authService.getId() ?? 0;

    this.publicacionesService.consultarPublicacionesPorUsuario(getId).subscribe({
      next: (publicaciones) => {
        this.publicaciones = [...publicaciones];
        this.ultimasPublicaciones = [...publicaciones]
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime()
          )
          .slice(0, 5);
        this.cantidadPublicaciones = publicaciones.length;
      },
      error: (err) => {
        console.error("Error al obtener publicaciones:", err);
      },
    });
  }

  private cargarSolicitudesPendientes() {
    this.solicitudesService.obtenerSolicitudesPendientes().subscribe({
      next: (res) => {
        this.cantidadSolicitudesPendientes = res.length;
      },
      error: (err) => {
        console.error('Error al obtener solicitudes pendientes:', err);
      },
    });
  }

  private cargarIntercambiosCompletados() {
    this.intercambiosService.intercambiosCompletados().subscribe({
      next: (res) => {
        this.cantidadIntercambiosCompletados = res;
      },
      error: (err) => {
        console.error('Error al obtener intercambios completados:', err);
      },
    });
  }
}

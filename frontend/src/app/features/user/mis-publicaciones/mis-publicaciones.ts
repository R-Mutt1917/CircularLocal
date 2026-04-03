import { Component, inject, OnInit } from '@angular/core';
import { PublicacionModel, PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
import { PublicacionPerfil } from './components/publicacion-perfil/publicacion-perfil';
import { Router } from '@angular/router';
import { AuthServices } from '../../../core/services/auth';
import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';

@Component({
  selector: 'app-mis-publicaciones',
  imports: [PublicacionPerfil,],
  templateUrl: './mis-publicaciones.html',
  styleUrl: './mis-publicaciones.scss',
})
export class MisPublicaciones implements OnInit {
  private publicacionesService = inject(PublicacionesService);
  private authService = inject(AuthServices);
  private router = inject(Router);

  publicaciones: PublicacionPreviewModel[] = [];


  ngOnInit() {
    const id = this.authService.getId();
    if (id) {
      this.publicacionesService.consultarPublicacionesPorUsuario(Number(id)).subscribe((publicaciones) => {
        this.publicaciones = publicaciones;
      });
    }
  }


  onEditarPublicacion(publicacion: PublicacionPreviewModel) {
    this.router.navigate(['/app/editar-publicacion', publicacion.id]);
  }

  onToggleEstadoPublicacion(publicacion: PublicacionPreviewModel) {
    console.log('Cambiar estado:', publicacion);
    // TODO: Llamar al servicio para cambiar el estado (Pausar/Activar)
  }

  onEliminarPublicacion(publicacion: PublicacionPreviewModel) {
    console.log('Eliminar:', publicacion);
    // TODO: Mostrar diálogo de confirmación y llamar al servicio
  }
}

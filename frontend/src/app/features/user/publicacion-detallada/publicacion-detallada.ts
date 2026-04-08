import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
import { PublicacionDetalleModel, PublicacionPreviewModel, } from '../../../shared/models/publicaciones.model';
import { CommonModule } from '@angular/common';
import { Publicacion } from '../components/publicacion/publicacion';
import { SolicitarIntercambioModalComponent } from '../solicitar-intercambio-modal/solicitar-intercambio-modal';

@Component({
  selector: 'app-publicacion-detallada',
  imports: [CommonModule, Publicacion, RouterLink, SolicitarIntercambioModalComponent],
  templateUrl: './publicacion-detallada.html',
  styleUrl: './publicacion-detallada.scss',
})
export class PublicacionDetallada {
  private route = inject(ActivatedRoute);
  private publicacionesService = inject(PublicacionesService);
  mostrarModal = false;

  Publicacion: PublicacionDetalleModel | null = null;
  otrasPublicaciones: PublicacionPreviewModel[] = [];
  errorMessage: string | null = null;

  ngOnInit(): void {
    const publicacionId = this.route.snapshot.paramMap.get('id');
    if(publicacionId){
      this.publicacionesService.consultarPublicacionDetalle(Number(publicacionId)).subscribe({
        next: (publicacion) => {
            this.Publicacion = publicacion;
            this.obtenerOtrasPublicaciones();
          },
        error: (err) => console.error('Error al obtener la publicación', err)
      })
    }
  }

  obtenerOtrasPublicaciones(): void {
    if(this.Publicacion && this.Publicacion.user){
      const userId = this.Publicacion.user.id;
      this.publicacionesService.consultarPublicacionesPorUsuario(userId, 3).subscribe({
        next: (publicaciones) => {
            this.otrasPublicaciones = publicaciones;
          },
        error: (err) => console.error('Error al obtener otras publicaciones', err)
      })
    }
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

  reportarPublicacion(): void {
    if(!confirm('¿Estas seguro que quieres reportar esta publicacion?')){
      return;
    }
    if(this.Publicacion){
      this.publicacionesService.reportarPublicacion(this.Publicacion.id).subscribe({
        next: (response) => {
          alert('Publicacion reportada correctamente');
          console.log(response);
        },
        error: (err) => {
          console.error('Error al reportar la publicación', err)
          alert('Error al reportar la publicación');
        }
      })
    }
  }

}
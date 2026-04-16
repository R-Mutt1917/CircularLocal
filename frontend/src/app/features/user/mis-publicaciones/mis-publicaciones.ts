import { Component, inject, OnInit } from '@angular/core';
import { PublicacionModel, PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
import { PublicacionPerfil } from './components/publicacion-perfil/publicacion-perfil';
import { Router, RouterLink } from '@angular/router';
import { AuthServices } from '../../../core/services/auth';
import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';

@Component({
  selector: 'app-mis-publicaciones',
  imports: [PublicacionPerfil, RouterLink],
  templateUrl: './mis-publicaciones.html',
  styleUrl: './mis-publicaciones.scss',
})
export class MisPublicaciones implements OnInit {
  private publicacionesService = inject(PublicacionesService);
  private authService = inject(AuthServices);
  private router = inject(Router);

  publicaciones: PublicacionPreviewModel[] = [];
  errorMessage: string | null = null;

  ngOnInit() {
    const id = this.authService.getId();
    if (id) {
      this.publicacionesService.consultarPublicacionesPorUsuario(Number(id)).subscribe({
        next: (publicaciones) => {
          this.publicaciones = publicaciones;
        },
        error: (error) => {
          console.error('Error al cargar mis publicaciones:', error);
          this.errorMessage = 'Ocurrió un error al cargar tus publicaciones. Por favor, intenta de nuevo más tarde.';
        }
      });
    } else {
      this.errorMessage = 'No se encontró el ID del usuario.';
    }
  }


  onEditarPublicacion(publicacion: PublicacionPreviewModel) {
    this.router.navigate(['/app/editar-publicacion', publicacion.id]);
  }

  onToggleEstadoPublicacion(publicacion: PublicacionPreviewModel) {
    console.log('Cambiar estado:', publicacion);
    if (!confirm('¿Está seguro de que desea cambiar el estado de esta publicación?')) {
      return;
    }
    if(publicacion.estado === 'Publicada'){
      this.publicacionesService.finalizarPublicacion(publicacion.id).subscribe({
        next: () => {
          this.publicaciones = this.publicaciones.map(p => 
            p.id === publicacion.id ? { ...p, estado: 'Finalizada' } : p
          );
        },
        error: (error) => {
        console.error('Error al finalizar la publicación:', error);
        this.errorMessage = 'Ocurrió un error al finalizar la publicación. Por favor, intenta de nuevo más tarde.';
      }
    });
  }else{
    this.publicacionesService.activarPublicacion(publicacion.id).subscribe({
      next: () => {
        this.publicaciones = this.publicaciones.map(p => 
          p.id === publicacion.id ? { ...p, estado: 'Publicada' } : p
        );
      },
      error: (error) => {
        console.error('Error al activar la publicación:', error);
        this.errorMessage = 'Ocurrió un error al activar la publicación. Por favor, intenta de nuevo más tarde.';
      }
    });
  }
 }

  onEliminarPublicacion(publicacion: PublicacionPreviewModel) {
    console.log('Eliminar:', publicacion);
    if(confirm('¿Está seguro de que desea eliminar esta publicación?')){
    this.publicacionesService.eliminarPublicacion(publicacion.id).subscribe({
      next: () => {
        this.publicaciones = this.publicaciones.filter(p => p.id !== publicacion.id);
      },
      error: (error) => {
        console.error('Error al eliminar la publicación:', error);
        this.errorMessage = 'Ocurrió un error al eliminar la publicación. Por favor, intenta de nuevo más tarde.';
      }
    });
    }
  }
}

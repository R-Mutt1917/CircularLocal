import { Component, inject, signal } from '@angular/core';
import { FormPublicacion } from '../components/form-publicacion/form-publicacion';
import { ActivatedRoute, Router } from '@angular/router';
import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
import { PublicacionModel } from '../../../shared/models/publicaciones.model';

@Component({
  selector: 'app-editar-publicacion',
  imports: [FormPublicacion],
  templateUrl: './editar-publicacion.html',
  styleUrl: './editar-publicacion.scss',
})
export class EditarPublicacion {
  private route = inject(ActivatedRoute);
  private publicacionesService = inject(PublicacionesService);

  publicacionId: number | null = null;
  publicacion: PublicacionModel | null = null;

  ngOnInit() {
    const publicacionId = this.route.snapshot.paramMap.get('id');
    if(publicacionId){
      this.publicacionId = Number(publicacionId);
      this.publicacionesService.obtenerPublicacion(this.publicacionId).subscribe({
        next: (publicacion) => {
            this.publicacion = publicacion
          },
        error: (err) => console.error('Error al obtener la publicación', err)
      })
    }
    
  }


}

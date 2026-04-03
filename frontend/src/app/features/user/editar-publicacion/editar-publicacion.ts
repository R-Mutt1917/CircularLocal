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
  // private publicacionesService = inject(PublicacionesService);
  //private router = inject(Router);

  publicacionId: string | null = null;
  publicacion: PublicacionModel | null = null;
  //isLoading = signal(false);

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.publicacionId = params.get('id');
      if (this.publicacionId) {
        this.cargarPublicacion();
      }
    });
  }


  cargarPublicacion() {
    this.publicacion = {
      id: 1,
      titulo: 'Material de Construcción',
      descripcion: 'Vendo restos de material de construcción',
      tipo: 'MATERIAL',
      tag: 'Metalurgia',
      user_id: 1,
      createdAt: '2022-01-01',
      detalle: {
        nombreMaterial: 'Cemento',
        cantidad: 10,
        unidad: 'kg',
      },
      estado: 'PUBLICADA',
      imagenPrincipal: 'https://example.com/image.jpg',
    };
    // this.isLoading.set(true);
    /*  this.publicacionesService.obtenerPublicacion(this.publicacionId!).subscribe({
       next: (data: PublicacionModel) => {
         this.publicacion = data;
         this.isLoading.set(false);
       },
       error: () => {
         this.isLoading.set(false);
         this.router.navigate(['/app/mis-publicaciones']);
       }
     }); */
  }
}

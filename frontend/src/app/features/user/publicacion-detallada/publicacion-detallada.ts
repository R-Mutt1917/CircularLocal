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

  idPublicacion!: PublicacionDetalleModel;
  otrasPublicaciones: PublicacionPreviewModel[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      window.scrollTo(0, 0);
      const id = params.get('id');
      console.log('id de ruta:', id);

      this.publicacionesService.consultarPublicacionDetalle(Number(id)).subscribe({
        next: (publicacion) => {
          this.idPublicacion = publicacion;
          console.log(this.idPublicacion);
        },
        error: (err) => {
          console.log(err);
        },
      });


      this.publicacionesService.consultarPublicacionesPorUsuario(Number(id), 3).subscribe({
        next: (publicaciones) => {
          this.otrasPublicaciones = publicaciones;
          console.log(this.otrasPublicaciones);
        },
        error: (err) => {
          console.log(err);
        },
      });

    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

}
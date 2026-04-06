import { Component, inject, OnInit } from '@angular/core';
import { Form, SearchFilters } from './components/form/form';
import { Publicacion } from '../components/publicacion/publicacion';
import { PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';

@Component({
  selector: 'app-publicaciones',
  imports: [Form, Publicacion],
  templateUrl: './publicaciones.html',
  styleUrl: './publicaciones.scss',
})
export class Publicaciones implements OnInit {
  private publicacionesService = inject(PublicacionesService);

  publicaciones: PublicacionPreviewModel[] = [];

  ngOnInit() {
    this.publicacionesService.consultarPublicacionesPreview().subscribe({
      next: (publicaciones) => {
        this.publicaciones = publicaciones;
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  filtradorDeProductos(filters: SearchFilters) {
    //ARREGLAR ESTO PORQUE NO ANDA
    this.publicaciones = this.publicaciones.filter((publicacion) => {
      const matchQuery = publicacion.titulo.includes(filters.searchQuery)
      const matchTag = filters.tagSeleccionado === ''
        || publicacion.tag === filters.tagSeleccionado;
      const matchType = filters.tipoSeleccionado === ''
        || publicacion.tipo === filters.tipoSeleccionado;

      return matchQuery && matchTag && matchType;
    });
  }




}

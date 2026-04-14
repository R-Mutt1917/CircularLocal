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
  allPublicaciones: PublicacionPreviewModel[] = [];

  ngOnInit() {
    this.publicacionesService.consultarPublicacionesPreview().subscribe({
      next: (publicaciones) => {
        this.allPublicaciones = publicaciones;
        this.publicaciones = [...publicaciones];
      },
      error: (err) => {
        console.error("Error al obtener publicaciones:", err);
      },
    });

  }

  filtrarPublicaciones(filters: SearchFilters) {
    this.publicaciones = this.allPublicaciones.filter((publicacion) => {
      const matchQuery = !filters.searchQuery || 
        publicacion.titulo.toLowerCase().includes(filters.searchQuery.toLowerCase());

      const matchTag = !filters.tagSeleccionado
        || publicacion.tag === filters.tagSeleccionado;

      const matchType = !filters.tipoSeleccionado || 
        publicacion.tipo.toLowerCase() === filters.tipoSeleccionado.toLowerCase();

      return matchQuery && matchTag && matchType;
    });
  }




}

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

  //private readonly publicacionesOriginales = [
  //  {
  //id: 1,
  //  titulo: "Sillas de madera para restaurante",
  //    imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
  //        tipo: "material",
  //          tagId: 1,
  //            user_id: 101,
  //                createdAt: "2026-01-10T09:00:00.000Z",
  //                  tag: {
  //    id: 1,
  //      nombre: "Metalurgia",
  //    },
  //user: {
  //  id: 101,
  //    perfil: {
  //      nombre_perfil: "Juan Maderas",
  //      imagen: "https://i.pravatar.cc/150?img=1",
  //      },
  //  },
  //},
  //{
  // id: 2,
  //   titulo: "Desarrollo de sitio web a medida",
  //     imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
  //       estado: "publicada",
  //         tipo: "producto",
  //           tagId: 2,
  //user_id: 102,
  //createdAt: "2026-02-01T11:00:00.000Z",
  //tag: {
  //  id: 2,
  //  nombre: "Madera Recup.",
  //},
  // user: {
  //   id: 102,
  //  perfil: {
  //    nombre_perfil: "Dev Solutions",
  //    imagen: "https://i.pravatar.cc/150?img=2",
  //  },
  // },
  //},
  //{
  // id: 3,
  //  titulo: "Notebook Lenovo ThinkPad E14",
  //    imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
  //     estado: "publicada",
  //       tipo: "servicio",
  //         tagId: 3,
  //           user_id: 103,
  //             createdAt: "2025-11-20T08:45:00.000Z",
  //               tag: {
  //id: 3,
  //  nombre: "Cerámica",
  //  },
  //user: {
  //  id: 103,
  //    perfil: {
  //nombre_perfil: "Tech Store",
  //imagen: "https://i.pravatar.cc/150?img=3",
  //},
  //},
  //},
  //{
  // id: 4,
  //   titulo: "Clases de inglés para empresas",
  //    imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
  //      estado: "publicada",
  //         tipo: "material",
  //           tagId: 2,
  //             user_id: 104,
  //               createdAt: "2026-03-05T16:20:00.000Z",
  //                 tag: {
  //  id: 2,
  //     nombre: "Madera Recup.",
  //     },
  // user: {
  //   id: 104,
  //     perfil: {
  //     nombre_perfil: "English Pro",
  //       imagen: "https://i.pravatar.cc/150?img=4",
  //       },
  // },
  //},
  //{
  // id: 5,
  //   titulo: "Cemento Portland a granel por bolsa",
  //     imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
  //       estado: "publicada",
  //         tipo: "producto",
  //           tagId: 3,
  //             user_id: 105,
  //               createdAt: "2025-09-15T07:30:00.000Z",
  //                 tag: {
  //   id: 3,
  //     nombre: "Cerámica",
  //     },
  // user: {
  //   id: 105,
  //     perfil: {
  //     nombre_perfil: "Materiales Córdoba",
  //       imagen: "https://i.pravatar.cc/150?img=5",
  //       },
  // },
  //},
  //];

  ngOnInit() {
    this.publicacionesService.consultarPublicacionesPreview().subscribe({
      next: (publicaciones) => {
        this.publicaciones = publicaciones.filter((publicacion) => publicacion.estado === 'publicada');
      },
      error: (err) => {
        console.log(err);
      },
    });

    //this.publicaciones = [...this.publicacionesOriginales];
  }

  filtradorDeProductos(filters: SearchFilters) {
    this.publicaciones = this.publicaciones.filter((publicacion) => {
      const matchQuery = publicacion.titulo.toLowerCase().includes(filters.searchQuery.toLowerCase())

      const matchTag = filters.tagSeleccionado === ''
        || publicacion.tag.nombre === filters.tagSeleccionado;
      const matchType = filters.tipoSeleccionado === ''
        || publicacion.tipo.toLowerCase() === filters.tipoSeleccionado.toLowerCase();

      return matchQuery && matchTag && matchType;
    });
  }




}

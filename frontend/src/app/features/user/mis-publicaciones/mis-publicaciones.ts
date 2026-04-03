import { Component, inject, OnInit } from '@angular/core';
//import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
//import { AuthServices } from '../../../core/services/auth';
import { PublicacionModel, PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
import { PublicacionPerfil } from './components/publicacion-perfil/publicacion-perfil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mis-publicaciones',
  imports: [PublicacionPerfil,],
  templateUrl: './mis-publicaciones.html',
  styleUrl: './mis-publicaciones.scss',
})
export class MisPublicaciones implements OnInit {
  private readonly publicacionesOriginales = [
    {
      id: 1,
      titulo: "Sillas de madera para restaurante",
      imagenPrincipal: "https://i.pravatar.cc/150?img=1",
      estado: "publicada",
      tipo: "material",
      tagId: 1,
      user_id: 101,
      createdAt: "2026-01-10T09:00:00.000Z",
      tag: {
        id: 1,
        nombre: "Metalurgia",
      },
      user: {
        id: 101,
        perfil: {
          nombre_perfil: "Juan Maderas",
          imagen: "https://i.pravatar.cc/150?img=1",
        },
      },
    },
    {
      id: 2,
      titulo: "Desarrollo de sitio web a medida",
      imagenPrincipal: "https://i.pravatar.cc/150?img=2",
      estado: "publicada",
      tipo: "producto",
      tagId: 2,
      user_id: 102,
      createdAt: "2026-02-01T11:00:00.000Z",
      tag: {
        id: 2,
        nombre: "Madera Recup.",
      },
      user: {
        id: 102,
        perfil: {
          nombre_perfil: "Dev Solutions",
          imagen: "https://i.pravatar.cc/150?img=2",
        },
      },
    },
    {
      id: 3,
      titulo: "Notebook Lenovo ThinkPad E14",
      imagenPrincipal: "https://i.pravatar.cc/150?img=3",
      estado: "publicada",
      tipo: "servicio",
      tagId: 3,
      user_id: 103,
      createdAt: "2025-11-20T08:45:00.000Z",
      tag: {
        id: 3,
        nombre: "Cerámica",
      },
      user: {
        id: 103,
        perfil: {
          nombre_perfil: "Tech Store",
          imagen: "https://i.pravatar.cc/150?img=3",
        },
      },
    },
  ];


  //private publicacionesService = inject(PublicacionesService);
  //private authService = inject(AuthServices);
  private router = inject(Router);

  publicaciones: PublicacionPreviewModel[] = [];

  ngOnInit() {
    // const id = this.authService.getId();
    // if (id) {
    //   this.publicacionesService.consultarPublicacionesPorUsuario(id).subscribe((publicaciones) => {
    //     this.publicaciones = publicaciones;
    //  });
    //}
    this.publicaciones = this.publicacionesOriginales;
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

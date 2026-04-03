import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
import { PublicacionDetalleModel, PublicacionModel, PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
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
  // private publicacionesService = inject(PublicacionesService);
  mostrarModal = false;

  // ── Publicación detallada estática 
  idPublicacion: PublicacionDetalleModel = {
    id: 1,
    titulo: "Sillas de madera para restaurante",
    descripcion: "Venta de mobiliario gastronómico usado en buen estado",
    tipo: "material",
    fechaCreacion: "2026-04-03T10:30:00.000Z",
    fechaActualizacion: "2026-04-03T10:30:00.000Z",
    fechaFinalizacion: null,
    fechaEliminacion: null,
    estado: "publicada",
    imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
    verificada: true,
    reportada: false,
    tag: {
      id: 1,
      nombre: "Muebles"
    },
    user: {
      id: 1,
      perfil: {
        nombre_perfil: "Juan Pablo Medina",
        imagen: "https://i.pravatar.cc/150?img=1",
        descripcion: "Venta de mobiliario gastronómico usado en buen estado",
        direccion: "Córdoba Capital, Argentina",
        telefono: "+54 351 1234567",
        email: "[EMAIL_ADDRESS]",
        tipo_actor: "vendedor"
      }
    }
  }


  // ── Otras publicaciones del usuario estáticas
  otrasPublicaciones: PublicacionPreviewModel[] = [
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

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      window.scrollTo(0, 0);
      const id = params.get('id');
      console.log('id de ruta:', id);

      // this.publicacionesService.consultarPublicacionDetalle(id).subscribe({
      //   next: (publicacion) => {
      //     this.idPublicacion = publicacion;
      //     console.log(this.idPublicacion);
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });


      //this.publicacionesService.consultarPublicacionesPorUsuario(id, 3).subscribe({
      //  next: (publicaciones) => {
      //    this.otrasPublicaciones = publicaciones;
      //    console.log(this.otrasPublicaciones);
      //  },
      //  error: (err) => {
      //    console.log(err);
      //  },
      //});

    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

}
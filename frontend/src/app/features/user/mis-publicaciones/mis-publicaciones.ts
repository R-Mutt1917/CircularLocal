import { Component, inject, OnInit } from '@angular/core';
//import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
//import { AuthServices } from '../../../core/services/auth';
import { PublicacionModel } from '../../../shared/models/publicaciones.model';
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
      descripcion: "Vendo lote de 20 sillas de madera en buen estado, ideales para restaurante o bar. Poco uso, sin roturas.",
      tipo: "material",
      tag: "Metalurgia",
      fechaCreacion: "2026-01-10T09:00:00.000Z",
      fechaActualizacion: "2026-01-15T14:30:00.000Z",
      fechaFinalizacion: "2026-03-10T09:00:00.000Z",
      fechaEliminacion: null,
      estado: "publicada",
      imagenPrincipal: "https://picsum.photos/seed/sillas/800/600",
      verificada: true,
      reportada: false
    },
    {
      id: 2,
      titulo: "Desarrollo de sitio web a medida",
      descripcion: "Ofrezco servicio de desarrollo web full-stack con React y Node.js. Entrega en 4 semanas, incluye diseño responsive y panel de administración.",
      tipo: "servicio",
      tag: "Madera Recup.",
      fechaCreacion: "2026-02-01T11:00:00.000Z",
      fechaActualizacion: "2026-02-01T11:00:00.000Z",
      fechaFinalizacion: "2026-05-01T11:00:00.000Z",
      fechaEliminacion: null,
      estado: "publicada",
      imagenPrincipal: "https://picsum.photos/seed/webdev/800/600",
      verificada: true,
      reportada: false
    },
    {
      id: 3,
      titulo: "Notebook Lenovo ThinkPad E14",
      descripcion: "ThinkPad E14 Gen 3, Ryzen 5 5600U, 16GB RAM, 512GB SSD. Comprada en 2023, batería al 91%. Incluye cargador original.",
      tipo: "producto",
      tag: "Cerámica",
      fechaCreacion: "2025-11-20T08:45:00.000Z",
      fechaActualizacion: "2026-03-01T10:00:00.000Z",
      fechaFinalizacion: "2025-12-31T23:59:59.000Z",
      fechaEliminacion: null,
      estado: "finalizada",
      imagenPrincipal: "https://picsum.photos/seed/thinkpad/800/600",
      verificada: false,
      reportada: false
    },
    {
      id: 4,
      titulo: "Clases de inglés para empresas",
      descripcion: "Dictado de clases grupales e individuales orientadas al inglés de negocios. Certificación disponible. Modalidad online o presencial en Córdoba capital.",
      tipo: "servicio",
      tag: "Madera Recup.",
      fechaCreacion: "2026-03-05T16:20:00.000Z",
      fechaActualizacion: "2026-03-05T16:20:00.000Z",
      fechaFinalizacion: null,
      fechaEliminacion: null,
      estado: "borrador",
      imagenPrincipal: "https://picsum.photos/seed/ingles/800/600",
      verificada: false,
      reportada: false
    },
    {
      id: 5,
      titulo: "Cemento Portland a granel por bolsa",
      descripcion: "Venta de cemento Portland normal en bolsas de 50kg. Stock disponible: 200 bolsas. Retiro en depósito zona industrial de Córdoba.",
      tipo: "material",
      tag: "Cerámica",
      fechaCreacion: "2025-09-15T07:30:00.000Z",
      fechaActualizacion: "2025-10-01T09:00:00.000Z",
      fechaFinalizacion: "2025-10-15T07:30:00.000Z",
      fechaEliminacion: "2025-10-20T12:00:00.000Z",
      estado: "cancelada",
      imagenPrincipal: "https://picsum.photos/seed/cemento/800/600",
      verificada: true,
      reportada: true
    }
  ];

  //private publicacionesService = inject(PublicacionesService);
  //private authService = inject(AuthServices);
  private router = inject(Router);

  publicaciones: PublicacionModel[] = [];

  ngOnInit() {
    // const id = this.authService.getId();
    // if (id) {
    //   this.publicacionesService.consultarPublicacionesPorUsuario(id).subscribe((publicaciones) => {
    //     this.publicaciones = publicaciones;
    //  });
    //}
    this.publicaciones = this.publicacionesOriginales;
  }


  onEditarPublicacion(publicacion: PublicacionModel) {
    this.router.navigate(['/app/editar-publicacion', publicacion.id]);
  }

  onToggleEstadoPublicacion(publicacion: PublicacionModel) {
    console.log('Cambiar estado:', publicacion);
    // TODO: Llamar al servicio para cambiar el estado (Pausar/Activar)
  }

  onEliminarPublicacion(publicacion: PublicacionModel) {
    console.log('Eliminar:', publicacion);
    // TODO: Mostrar diálogo de confirmación y llamar al servicio
  }
}

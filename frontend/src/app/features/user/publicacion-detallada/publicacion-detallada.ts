import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
// import { PublicacionesService } from '../../../core/services/publicacionesServices/publicaciones';
import { PublicacionModel } from '../../../shared/models/publicaciones.model';
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

  // ── Perfil estático
  perfil = {
    nombre_perfil: 'Mateo',
    tipo_actor: 'RECICLADOR' as 'COOPERATIVA' | 'RECICLADOR' | 'EMPRENDEDOR',
    descripcion: 'Me especializo en el rescate de maderas nobles de demoliciones patrimoniales. Circularidad es mi filosofía.',
    direccion: 'Córdoba Capital, Alberdi',
  };

  // ── Publicación detallada estática 
  idPublicacion: PublicacionModel = {
    id: 1,
    titulo: 'Tablones de Cedro Recuperado (S. XIX)',
    descripcion: `Este lote incluye tablones de cedro macizo con dimensiones variables entre 2 y 3 metros.
Han sido limpiados de clavos y tratados preventivamente contra xilófagos de manera orgánica.
Son ideales para revestimientos de interior o fabricación de mobiliario de autor.
Busco a cambio materiales de ferretería o herramientas de mano en buen estado para mi taller de restauración.`,
    tipo: 'material',
    tag: 'Madera Recup.',
    fechaCreacion: '2024-03-01',
    fechaActualizacion: '2024-03-15',
    fechaFinalizacion: null,
    fechaEliminacion: null,
    estado: 'publicada',
    imagenPrincipal: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    verificada: true,
    reportada: false,
  };

  // ── Otras publicaciones del usuario estáticas
  otrasPublicaciones: PublicacionModel[] = [
    {
      id: 2,
      titulo: 'Vigas de hierro doble T',
      descripcion: 'Vigas estructurales recuperadas de demolición industrial.',
      tipo: 'material',
      tag: 'Metalurgia',
      fechaCreacion: '2024-02-10',
      fechaActualizacion: '2024-02-20',
      fechaFinalizacion: null,
      fechaEliminacion: null,
      estado: 'publicada',
      imagenPrincipal: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400',
      verificada: false,
      reportada: false,
    },
    {
      id: 3,
      titulo: 'Ladrillos Vistos (Lote 500)',
      descripcion: 'Ladrillos artesanales de principios de siglo recuperados.',
      tipo: 'material',
      tag: 'Cerámica',
      fechaCreacion: '2024-01-05',
      fechaActualizacion: '2024-01-18',
      fechaFinalizacion: null,
      fechaEliminacion: null,
      estado: 'publicada',
      imagenPrincipal: 'https://images.unsplash.com/photo-1586717799252-bd134ad00e26?w=400',
      verificada: true,
      reportada: false,
    },
    {
      id: 4,
      titulo: 'Garlopa Manual Carpintero',
      descripcion: 'Herramienta de carpintería vintage en buen estado.',
      tipo: 'producto',
      tag: 'Herramientas',
      fechaCreacion: '2024-03-20',
      fechaActualizacion: '2024-03-20',
      fechaFinalizacion: null,
      fechaEliminacion: null,
      estado: 'publicada',
      imagenPrincipal: 'https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=400',
      verificada: false,
      reportada: false,
    },
  ];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      window.scrollTo(0, 0);
      const id = params.get('id');
      console.log('id de ruta:', id);

      // this.publicacionesService.consultarPublicacionDetallada(id!).subscribe({
      //   next: (publicacion) => {
      //     this.idPublicacion = publicacion;
      //     console.log(this.idPublicacion);
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      // });

      //CREAR SERVICE DE OBTENER OTROS PRODUCTOS DEL PERFIL
    });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  cerrarModal(): void {
    this.mostrarModal = false;
  }

}
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { adminService } from '../../../core/services/adminService/admin';
import { FormFilter } from '../components/form-filter/form-filter';
import { ListadoPublicaciones } from './components/listado-publicaciones/listado-publicaciones';
import { PublicacionAdmin } from '../../../shared/models/publicaciones.model';

export interface UserFilters {
  nombre: string;
  tipo: string;
}

@Component({
  selector: 'app-moderacion',
  imports: [FormFilter, ListadoPublicaciones],
  templateUrl: './moderacion.html',
  styleUrl: './moderacion.scss',
})
export class Moderacion implements OnInit {

  private adminService = inject(adminService);
 private PAGE_SIZE = 5;

  private allPublicaciones = signal<PublicacionAdmin[]>([]);
  private filters = signal<UserFilters>({ nombre: '', tipo: '' });

  ngOnInit() {
    this.adminService.obtenerPublicacionesReportadas().subscribe({
      next: (publicaciones) => {
        console.log("publicaciones obtenidas:",publicaciones);
        this.allPublicaciones.set(publicaciones.publicaciones);
      },
      error: (err) => {
        console.log("error al obtener publicaciones",err);
      },
    });
  }

currentPage = signal(1);

  filteredPublicaciones = computed(() => {
    const { nombre, tipo } = this.filters();
    
    return this.allPublicaciones().filter(u => {
      const matchesNombre =
        !nombre ||
        u.titulo.toLowerCase().includes(nombre.toLowerCase());
      const matchesTipo = !tipo || u.tipo === tipo;
      return matchesNombre && matchesTipo;
    });
  });


  pagedPublicaciones = computed(() => {
    const start = (this.currentPage() - 1) * this.PAGE_SIZE;
    return this.filteredPublicaciones().slice(start, start + this.PAGE_SIZE);
  });

 
  totalPages = computed(() =>
    Math.ceil(this.filteredPublicaciones().length / this.PAGE_SIZE) || 1
  );


  onFiltersApplied(filters: UserFilters) {
    this.filters.set(filters); 
    this.currentPage.set(1);   
  }

  onCancelPublication(publicacion: PublicacionAdmin) {
    this.adminService.cancelarPublicacion(publicacion.id).subscribe({
      next: (response) => {
        console.log("publicacion cancelada:",response);
        alert("publicacion cancelada exitosamente");
        this.allPublicaciones.set(this.allPublicaciones().filter(p => p.id !== publicacion.id));
      },
      error: (err) => {
        alert("error al cancelar publicacion");
        console.log("error al cancelar publicacion",err);
      },
    });
  }

  onPageChange(page: number) {
    this.currentPage.set(page);
  }
}




  
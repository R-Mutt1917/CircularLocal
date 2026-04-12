import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicacionAdmin } from '../../../../../shared/models/publicaciones.model';

@Component({
  selector: 'app-listado-publicaciones',
  imports: [CommonModule],
  templateUrl: './listado-publicaciones.html',
  styleUrl: './listado-publicaciones.scss',
})
export class ListadoPublicaciones {

  publications = input.required<PublicacionAdmin[]>();
  totalPublications = input<number>(0);
  currentPage = input<number>(1);
  totalPages = input<number>(1);

  cancelPublication = output<PublicacionAdmin>();
  pageChange = output<number>();

  get pages(): number[] {
    const total = this.totalPages();
    const current = this.currentPage();
    const start = Math.max(1, current - 1);
    const end = Math.min(total, start + 2);
    const range: number[] = [];
    for (let i = start; i <= end; i++) range.push(i);
    return range;
  }

  formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString('es-AR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  onCancel(pub: PublicacionAdmin): void {
    if(confirm("¿Estas seguro de cancelar esta publicacion?")){
      this.cancelPublication.emit(pub);
    }
  }

  getInitials(name: string): string {
    return name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  }
}
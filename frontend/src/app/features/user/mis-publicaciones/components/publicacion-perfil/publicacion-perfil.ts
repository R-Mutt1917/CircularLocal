import { Component, input, computed, output } from '@angular/core';
import { PublicacionPreviewModel } from '../../../../../shared/models/publicaciones.model';
import { NgClass, NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-publicacion-perfil',
  imports: [NgClass, NgTemplateOutlet],
  templateUrl: './publicacion-perfil.html',
  styleUrl: './publicacion-perfil.scss',
})
export class PublicacionPerfil {
  publicacion = input.required<PublicacionPreviewModel>();

  editar = output<PublicacionPreviewModel>();
  toggleEstado = output<PublicacionPreviewModel>();
  eliminar = output<PublicacionPreviewModel>();

  estadoLabel = computed(() => {
    const map: Record<string, string> = {
      finalizada: 'Finalizada',
      publicada: 'Publicada',
      borrador: 'Borrador',
      cancelada: 'Cancelada',
    };
    return map[this.publicacion().estado] || this.publicacion().estado;
  });


  estadoClass = computed(() => `card--${this.publicacion().estado}`);

  onEditar() {
    this.editar.emit(this.publicacion());
  }

  onToggleEstado() {
    this.toggleEstado.emit(this.publicacion());
  }

  onEliminar() {
    this.eliminar.emit(this.publicacion());
  }
}
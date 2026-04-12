import { Component, output, inject, input } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
 
export interface UserFilters {
  nombre: string;
  tipo: string;
}

@Component({
  selector: 'app-form-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './form-filter.html',
  styleUrl: './form-filter.scss',
})
export class FormFilter {
  filtersApplied = output<UserFilters>();
  filtroTipo = input<'USUARIOS' | 'PUBLICACIONES'>('USUARIOS'); 
  private fb = inject(NonNullableFormBuilder);
 
  
 get tipoActorOptions() {
  if (this.filtroTipo() === 'USUARIOS') {
    return [
      { value: '', label: 'Todos' },
      { value: 'EMPRENDEDOR', label: 'Emprendedor' },
      { value: 'RECICLADOR', label: 'Reciclador' },
      { value: 'COOPERATIVA', label: 'Cooperativa' },
    ];
  }
  return [
    { value: '', label: 'Todos' },
    { value: 'PRODUCTO', label: 'Producto' },
    { value: 'SERVICIO', label: 'Servicio' },
    { value: 'MATERIAL', label: 'Material' },
  ];
}

  
 
  form = this.fb.group({
    nombre: [''],
    tipo: [''],
  });

  apply() {
    this.filtersApplied.emit(this.form.getRawValue());
  }
}

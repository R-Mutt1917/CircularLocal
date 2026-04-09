import { Component, output, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
 
export interface UserFilters {
  nombre: string;
  tipoActor: string;
}

@Component({
  selector: 'app-form-filter',
  imports: [ReactiveFormsModule],
  templateUrl: './form-filter.html',
  styleUrl: './form-filter.scss',
})
export class FormFilter {
  filtersApplied = output<UserFilters>();
 
  private fb = inject(NonNullableFormBuilder);
 
  tipoActorOptions = [
    { value: '', label: 'Todos' },
    { value: 'Emprendedor', label: 'Emprendedor' },
    { value: 'Reciclador', label: 'Reciclador' },
    { value: 'Cooperativa', label: 'Cooperativa' },
  ];
 
  form = this.fb.group({
    nombre: [''],
    tipoActor: [''],
  });

  apply() {
    this.filtersApplied.emit(this.form.getRawValue());
  }
}

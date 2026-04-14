import { Component, inject, output, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

export interface SearchFilters {
  searchQuery: string;
  tipoSeleccionado: string;
  tagSeleccionado: string;
}

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule],
  templateUrl: './form.html',
  styleUrl: './form.scss',
})
export class Form implements OnInit {

  private fb = inject(FormBuilder);

  filtrar = output<SearchFilters>();

  form = this.fb.group({
    searchQuery: [''],
    tipo: [''],
    tag: [''],
  });

  tiposRecurso = [
    { label: 'Material', value: 'material' },
    { label: 'Producto', value: 'producto' },
    { label: 'Servicio', value: 'servicio' },
  ];

  //DEFINIR BIEN CON EL EQUIPO CUALES VAN A SER TODOS LOS TAGS
  tags = ['Madera Recup.', 'Textiles Orgánicos', 'Cerámica', 'Herramientas', 'Metalurgia'];

  seleccionarTipo(value: string): void {
    this.form.patchValue({ tipo: value });
  }

  seleccionarTag(tag: string): void {
    const current = this.form.value.tag;
    this.form.patchValue({ tag: current === tag ? '' : tag });
    if (tag === 'todos') {
      this.form.patchValue({ tag: '' });
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      this.filtrar.emit({
        searchQuery: value.searchQuery ?? '',
        tipoSeleccionado: value.tipo ?? '',
        tagSeleccionado: value.tag ?? '',
      });
    });
  }

}
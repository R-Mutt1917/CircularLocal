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

  filtradorDeProductos = output<SearchFilters>();

  form = this.fb.group({
    searchQuery: [''],
    tipo: [''],
    tag: [''],
  });

  tiposRecurso = [
    { label: 'Material', value: 'MATERIAL' },
    { label: 'Producto', value: 'PRODUCTO' },
    { label: 'Servicio', value: 'SERVICIO' },
  ];

  //DEFINIR BIEN CON EL EQUIPO CUALES VAN A SER TODOS LOS TAGS
  tags = ['todos', 'Madera Recup.', 'Textiles Orgánicos', 'Cerámica', 'Herramientas', 'Metalurgia'];

  seleccionarTipo(value: string): void {
    console.log("TIPO SELECCIONADO",value);
    this.form.patchValue({ tipo: value });
  }

  seleccionarTag(tag: string): void {
    console.log("TAG SELECCIONADO",tag);
    const current = this.form.value.tag;
    this.form.patchValue({ tag: current === tag ? '' : tag });
    if (tag === 'todos') {
      this.form.patchValue({ tag: '' });
    }
  }

  ngOnInit(): void {
    this.form.valueChanges.subscribe((value) => {
      console.log("VALOR DEL FORMULARIO",value);
      this.filtradorDeProductos.emit({
        searchQuery: value.searchQuery ?? '',
        tipoSeleccionado: value.tipo ?? '',
        tagSeleccionado: value.tag ?? '',
      });
    });
  }

}
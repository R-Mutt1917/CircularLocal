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

  tagsMap: Record<string, string[]> = {
    material: [
      'Madera', 'Metal', 'Plástico', 'Vidrio', 'Papel y Cartón', 'Textil', 'Electrónico', 'Construcción', 'Orgánico'
    ],
    producto: [
      'Muebles', 'Decoración', 'Ropa', 'Accesorios', 'Tecnología', 'Herramientas', 'Juguetes', 'Libros', 'Hogar'
    ],
    servicio: [
      'Reparación', 'Diseño', 'Transporte', 'Capacitación', 'Reciclaje', 'Mantenimiento', 'Jardinería', 'Limpieza', 'Logística'
    ]
  };

  get tags(): string[] {
    const tipo = this.form.value.tipo;
    if (tipo && this.tagsMap[tipo]) {
      return this.tagsMap[tipo];
    }
    return Object.values(this.tagsMap).flat();
  }

  seleccionarTipo(value: string): void {
    const current = this.form.value.tipo;
    const nuevoTipo = current === value ? '' : value;
    
    const validTags = nuevoTipo && this.tagsMap[nuevoTipo] 
      ? this.tagsMap[nuevoTipo] 
      : Object.values(this.tagsMap).flat();

    const currentTag = this.form.value.tag;
    const tagAActualizar = (currentTag && !validTags.includes(currentTag)) ? '' : currentTag;

    this.form.patchValue({ 
      tipo: nuevoTipo,
      tag: tagAActualizar
    });
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
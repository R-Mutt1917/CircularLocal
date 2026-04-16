import { Component, computed, inject, input, signal, } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicacionesService } from '../../../../core/services/publicacionesServices/publicaciones';
import { CrearPublicacionModel, PublicacionModel, TipoPublicacion } from '../../../../shared/models/publicaciones.model';

export interface ContenidoPublicacion {
  titulo: FormControl<string>;
  descripcion: FormControl<string>;
  tagId: FormControl<number | null>;
  tipo: FormControl<TipoPublicacion>;
  imagen: FormControl<string>;
  estado: FormControl<string>;
  detalle: FormGroup;
}

type CamposPublicacion = keyof ContenidoPublicacion;

@Component({
  selector: 'app-form-publicacion',
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './form-publicacion.html',
  styleUrl: './form-publicacion.scss',
})
export class FormPublicacion {
  readonly initialData = input<PublicacionModel | null>(null);
  readonly publicacionId = input<number | null>(null);

  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private publicacionService = inject(PublicacionesService);

  backendErrors: Partial<Record<CamposPublicacion, string>> = {};
  isLoading = signal(false);
  tags = signal<any[]>([]);

  private readonly tagsMap: Record<string, string[]> = {
    MATERIAL: ['Madera', 'Metal', 'Plástico', 'Vidrio', 'Papel y Cartón', 'Textil', 'Electrónico', 'Construcción', 'Orgánico'],
    PRODUCTO: ['Muebles', 'Decoración', 'Ropa', 'Accesorios', 'Tecnología', 'Herramientas', 'Juguetes', 'Libros', 'Hogar'],
    SERVICIO: ['Reparación', 'Diseño', 'Transporte', 'Capacitación', 'Reciclaje', 'Mantenimiento', 'Jardinería', 'Limpieza', 'Logística'],
  };

  tipoActual = signal<string>('');

  tagsFiltrados = computed(() => {
    const tipo = this.tipoActual();
    if (!tipo || !this.tagsMap[tipo]) return [];
    const nombresValidos = this.tagsMap[tipo];
    return this.tags().filter(tag => nombresValidos.includes(tag.name));
  });

  formPublicacion: FormGroup<ContenidoPublicacion> = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', Validators.required],
    tagId: [null as number | null, Validators.required],
    tipo: [null as unknown as TipoPublicacion, Validators.required],
    imagen: ["", Validators.required],
    estado: ['Borrador', Validators.required],
    detalle: this.fb.group({}),
  });

  previewUrl = signal<string | null>(null);

  ngOnInit() {
    this.cargarTags();

    this.formPublicacion.controls.tipo.valueChanges.subscribe((tipo) => {
      this.tipoActual.set(tipo ?? '');
      this.formPublicacion.controls.tagId.reset(null);
      this.buildDetalleForm(tipo);
    });

    this.formPublicacion.controls.imagen.valueChanges.subscribe((url) => {
      this.previewUrl.set(url || null);
    });

    const data = this.initialData();
    if (data) {
      this.tipoActual.set(data.tipo ?? '');
      this.buildDetalleForm(data.tipo);
      this.formPublicacion.patchValue({
        titulo: data.titulo,
        descripcion: data.descripcion,
        tagId: data.tagId,
        tipo: data.tipo,
        imagen: data.imagen,
        estado: data.estado,
      });
      this.previewUrl.set(data.imagen);
      if (data.detalle) {
        this.formPublicacion.controls.detalle.patchValue(data.detalle);
      }
    }
  }

  private cargarTags() {
    this.publicacionService.listarTags().subscribe({
      next: (tags) => this.tags.set(tags),
      error: (err) => console.error('Error al cargar tags', err)
    });
  }

  private buildDetalleForm(tipo: TipoPublicacion) {
    let detalleGroup: any = {};

    switch (tipo) {
      case 'MATERIAL':
        detalleGroup = {
          nombreMaterial: ['', Validators.required],
          cantidad: [0, [Validators.required, Validators.min(1)]],
          unidad: ['', Validators.required],
        };
        break;
      case 'PRODUCTO':
        detalleGroup = {
          nombreProducto: ['', Validators.required],
          cantidad: [0, [Validators.required, Validators.min(1)]],
          unidad: ['unidad', Validators.required],
        };
        break;
      case 'SERVICIO':
        detalleGroup = {
          modalidad: ['', Validators.required],
          disponibilidadHoraria: ['', Validators.required],
          zonaCobertura: ['', Validators.required],
        };
        break;
    }

    this.formPublicacion.setControl('detalle', this.fb.group(detalleGroup));
  }

  onSubmit() {
    this.backendErrors = {};
    this.isLoading.set(true);

    const datosPublicacion = this.formPublicacion.getRawValue() as CrearPublicacionModel;
    console.log('Datos de la publicación', datosPublicacion);

    if (this.initialData() === null) {
      this.publicacionService.crearPublicacion(datosPublicacion).subscribe({
        next: () => {
          this.formPublicacion.reset();
          this.removeImage();
          alert('Publicación creada correctamente');
          this.router.navigate(['/app/mis-publicaciones']);
        },
        error: (err) => {
          alert('Error al crear la publicación');
          if (err.error?.errors) {
            err.error.errors.forEach((e: { path: CamposPublicacion; msg: string }) => {
              this.backendErrors[e.path] = e.msg;
            });
          }
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    } else {
      const id = this.publicacionId();
      this.publicacionService.actualizarPublicacion(id!, datosPublicacion).subscribe({
        next: () => {
          this.formPublicacion.reset();
          this.removeImage();
          alert('Publicación actualizada correctamente');
          this.router.navigate(['/app/mis-publicaciones']);
        },
        error: (err) => {
          alert('Error al actualizar la publicación');
          if (err.error?.errors) {
            err.error.errors.forEach((e: { path: CamposPublicacion; msg: string }) => {
              this.backendErrors[e.path] = e.msg;
            });
          }
          this.isLoading.set(false);
        },
        complete: () => {
          this.isLoading.set(false);
        },
      });
    }
  }

  removeImage(): void {
    this.previewUrl.set(null);
    this.formPublicacion.controls.imagen.reset();
  }
}

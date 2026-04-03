import { Component, inject, input, signal, } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicacionesService } from '../../../../core/services/publicacionesServices/publicaciones';
import { CrearPublicacionModel, PublicacionModel, TipoPublicacion } from '../../../../shared/models/publicaciones.model';

export interface ContenidoPublicacion {
  titulo: FormControl<string>;
  descripcion: FormControl<string>;
  categoria: FormControl<string>;
  tipo: FormControl<TipoPublicacion>;
  imagen: FormControl<File | string | null>;
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

  private fb = inject(NonNullableFormBuilder);
  private router = inject(Router);
  private publicacionService = inject(PublicacionesService);

  backendErrors: Partial<Record<CamposPublicacion, string>> = {};
  isLoading = signal(false);

  formPublicacion: FormGroup<ContenidoPublicacion> = this.fb.group({
    titulo: ['', [Validators.required, Validators.minLength(5)]],
    descripcion: ['', Validators.required],
    categoria: ['', Validators.required],
    tipo: [null as unknown as TipoPublicacion, Validators.required],
    imagen: [null as File | string | null, Validators.required],
    detalle: this.fb.group({}),
  });

  ngOnInit() {
    this.formPublicacion.controls.tipo.valueChanges.subscribe((tipo) => {
      this.buildDetalleForm(tipo);
    });

    const data = this.initialData();
    if (data) {
      this.buildDetalleForm(data.tipo);

      this.formPublicacion.patchValue({
        titulo: data.titulo,
        descripcion: data.descripcion,
        categoria: data.tag,
        tipo: data.tipo,
        imagen: data.imagenPrincipal,
      });

      if (data.detalle) {
        this.formPublicacion.controls.detalle.patchValue(data.detalle);
      }
    }
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

    if (this.formPublicacion.invalid) {
      this.formPublicacion.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);
    const datosPublicacion = this.formPublicacion.getRawValue() as CrearPublicacionModel;

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
      const id = this.initialData()!.id;
      this.publicacionService.actualizarPublicacion(id, datosPublicacion).subscribe({
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

  selectedFile: File | null = null;
  previewUrl: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];
      this.formPublicacion.controls.imagen.setValue(this.selectedFile);

      const reader = new FileReader();
      reader.onload = () => (this.previewUrl = reader.result as string);
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.formPublicacion.controls.imagen.reset();
  }
}

import { Component, inject, input, signal, } from '@angular/core';
import { FormControl, FormGroup, NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PublicacionesService } from '../../../../core/services/publicacionesServices/publicaciones';
import { CrearPublicacionModel, PublicacionModel } from '../../../../shared/models/publicaciones.model';

export interface ContenidoPublicacion {
  titulo: FormControl<string>,
  descripcion: FormControl<string>,
  categoria: FormControl<string>,
  tipo: FormControl<string>,
  imagen: FormControl<File | null>,
}

type CamposPublicacion = keyof ContenidoPublicacion;

@Component({
  selector: 'app-form-publicacion',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './form-publicacion.html',
  styleUrl: './form-publicacion.scss',
})
export class FormPublicacion {
  readonly initialData = input<PublicacionModel | null>(null);

  private fb = inject(NonNullableFormBuilder)
  private router = inject(Router)
  private publicacionService = inject(PublicacionesService)

  backendErrors: Partial<Record<CamposPublicacion, string>> = {};

  isLoading = signal(false);

  formPublicacion: FormGroup<ContenidoPublicacion> = this.fb.group({
    titulo: ['', Validators.required],
    descripcion: ['', Validators.required],
    categoria: ['', Validators.required],
    tipo: ['', Validators.required],
    imagen: [null as File | null, Validators.required],
  })

  ngOnInit() {
    const data = this.initialData();
    if (data) {
      this.formPublicacion.patchValue({
        titulo: data.titulo,
        descripcion: data.descripcion,
        categoria: data.tag,
        tipo: data.tipo,
      });
    }
  }

  onSubmit() {
    this.backendErrors = {};

    if (this.formPublicacion.invalid) {
      this.formPublicacion.markAllAsTouched();
      return;
    }

    this.isLoading.set(true);

    const datosPublicacion = this.formPublicacion.getRawValue() as CrearPublicacionModel
    if (this.initialData() === null) {
      //DESCOMENTAR CUANDO SE HAGAN PRUEBAS CON EL SERVIDOR
      /* this.publicacionService.crearPublicacion(datosPublicacion).subscribe({
        next: () => {
          this.formPublicacion.reset();
          this.removeImage();
          alert('Publicacion creada correctamente');
          this.router.navigate(['/app/publicaciones']);
        },
        error: (err) => {
          alert('Error al crear la publicación');
          if (err.error?.errors) {
            err.error.errors.forEach((e: { path: CamposPublicacion; msg: string }) => {
              this.backendErrors[e.path] = e.msg;
            });
          }
        },
        complete: () => { this.isLoading.set(false); }
      }); */
      console.log(datosPublicacion);
    } else {
      console.log('Se actualizo la publicacion');
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
      reader.onload = () => this.previewUrl = reader.result as string;
      reader.readAsDataURL(this.selectedFile);
    }
  }

  removeImage(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.formPublicacion.controls.imagen.reset();
  }
}

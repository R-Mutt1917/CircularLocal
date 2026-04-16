import { Component, OnInit, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../core/services/auth';
import { Perfil } from '../../../core/services/perfilServices/perfil';
import { UserServices } from '../../../core/services/userServices/user';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile implements OnInit {
  private fb = inject(FormBuilder);
  private perfilService = inject(Perfil);
  private authServices = inject(AuthServices);
  private userServices = inject(UserServices);

  user = signal<any>(null);
  profile = signal<any>(null);
  isEditMode = signal(false);
  loading = signal(false);
  
  form!: FormGroup;

  ngOnInit(): void {
    this.createForm();
    this.loadUser();
  }

  createForm(){
    this.form = this.fb.group({
      username: [{value: '', disabled: true}, Validators.required],
      nombre_perfil: ['', Validators.required],
      descripcion: [''],
      direccion: [''],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      tipo_actor: ['', Validators.required],
    });
  }

  loadUser() {
    this.authServices.getUser().subscribe(res => {
      this.user.set(res.user);
      this.perfilService.getProfile(res.user.id).subscribe(perfil => {
        this.profile.set(perfil);
        this.updateForm(perfil);
      });
    });
  }

  updateForm(perfil: any) {
    this.form.patchValue({
      username: this.user().username,
      nombre_perfil: perfil.nombre_perfil,
      descripcion: perfil.descripcion,
      direccion: perfil.direccion,
      email: perfil.email,
      telefono: perfil.telefono,
      tipo_actor: perfil.tipo_actor,
      imagen: perfil.imagen
    });
    this.form.disable();
  }

  enableEdit() {
    this.isEditMode.set(true);
    this.form.enable();
  }

  cancelEdit() {
    this.isEditMode.set(false);
    const currentProfile = this.profile();
    if (currentProfile) {
      this.updateForm(currentProfile);
    }
    this.form.disable();
  }

  save() {
    if (this.form.invalid) return;

    this.loading.set(true);
    const formValue = this.form.getRawValue();
    const currentUser = this.user();

    const userData = {
      username: formValue.username,
    };

    const perfilData = {
      nombre_perfil: formValue.nombre_perfil,
      email: formValue.email,
      telefono: formValue.telefono,
      direccion: formValue.direccion,
      tipo_actor: formValue.tipo_actor,
      descripcion: formValue.descripcion,
    };

    this.userServices.updateUserProfile(currentUser.id, userData, perfilData).subscribe({
      next: (res) => {
        this.user.set(res.user);
        this.profile.set(perfilData);
        this.isEditMode.set(false);
        this.loading.set(false);
        this.form.disable();

        // Sincroniza el signal y el localStorage para que nav-user refleje el cambio
        const newUsername = formValue.username;
        localStorage.setItem('name', newUsername);
        this.authServices.userName.set(newUsername);

        alert('Perfil actualizado con éxito');
      },
      error: (err) => {
        this.loading.set(false);
        alert('Error al actualizar el perfil');
        console.error(err);
      }
    });
  }

  confirmDelete(){
    const currentUser = this.user();
    if (!currentUser) return;

    if (confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.')) {
      this.userServices.deleteUser(currentUser.id).subscribe({
        next: () => {
          alert('Usuario eliminado correctamente');
          localStorage.removeItem('token');
          window.location.href = '/login';
        },
        error: () => alert('Error al eliminar usuario')
      });
    }
  }
}

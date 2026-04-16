import { Component, OnInit } from '@angular/core';
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
  
  user: any;
  form!: FormGroup;
  isEditMode = false;
  loading = false;
  showDeleteConfirm = false;

  constructor(private fb: FormBuilder, private perfilService: Perfil , private authServices: AuthServices, private userServices: UserServices){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token){
      alert('Debes iniciar sesion');
      return;
    }
    this.createForm();
    this.loadUser();
  }

  createForm(){
    this.form = this.fb.group({
      username: ['',Validators.required],
      nombre_perfil: ['', Validators.required],
      descripcion: [''],
      direccion: [''],
      telefono: [''],
      email: ['', [Validators.required, Validators.email]],
      tipo_actor: ['', Validators.required],
      imagen: [''],
    });
  }

  confirmDelete(){
    this.showDeleteConfirm = false;
  
    this.userServices.deleteUser(this.user.id).subscribe({
      next: () => {
        alert('Usuario eliminado correctamente');
        localStorage.removeItem('token');
        location.href = '/login';
      },
      error: () => alert('Error al eliminar usuario')
    });
  }

  loadUser() {
    this.authServices.getUser().subscribe(res => {

      this.user = res.user;
      this.form.patchValue({
        username: this.user.username,
      });

      this.perfilService.getProfile(this.user.id).subscribe(perfil => {

        this.form.patchValue({
          nombre_perfil: perfil.nombre_perfil,
          descripcion: perfil.descripcion,
          direccion: perfil.direccion,
          email: perfil.email,
          telefono: perfil.telefono,
          tipo_actor: perfil.tipo_actor,
          imagen: perfil.imagen
        });

      });

    });
  }

  enableEdit() {
    this.isEditMode = true;
  }

  cancelEdit() {
    this.isEditMode = false;
    this.form.patchValue(this.user);
  }

  save() {
    if (this.form.invalid) return;

    this.loading = true;

    const formValue = this.form.value;

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
      imagen: formValue.imagen,
    };

    this.userServices.updateUserProfile(this.user.id,userData,perfilData).subscribe({
      next: (res) => {
        this.user = res.user;
        this.isEditMode = false;
        this.loading = false;
      },
      error: () => this.loading = false
    })
  }


}

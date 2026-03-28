import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../core/services/auth';
import { Perfil } from '../../../core/services/perfilServices/perfil';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authServices: AuthServices, private perfilService: Perfil) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      nombre_perfil: ['', Validators.required],
      direccion: ['', Validators.required],
      email: ['', Validators.required],
      tipo_actor: ['', Validators.required],
      telefono: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
  if (this.registerForm.valid) {
    const { username, password, ...perfilData } = this.registerForm.value;

    this.authServices.register(username, password).subscribe({
      next: (res) => {
      
        this.authServices.login(username, password).subscribe({
          next: (loginRes) => {
            
            localStorage.setItem('authToken', loginRes.token);
            
            const userId = res.userDto.id; 
            
            this.perfilService.updateUser(userId, perfilData).subscribe({
              next: () => {
                alert('¡Bienvenido! Tu cuenta y perfil han sido creados.');
              },
              error: (err) => {
                console.error('Error al completar perfil:', err);
                alert('Cuenta creada, pero hubo un error al guardar tus datos de perfil.');
              }
            });
          },
          error: (err) => alert('Error al iniciar sesión automática.')
        });
      },
      error: (err) => alert('El nombre de usuario ya existe o hubo un error.')
    });
  }
}
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authServices: AuthServices) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { username, password } = this.registerForm.value;
      this.authServices.register(username, password).subscribe({
        next: (res) => {
          console.log('Usuario creado:', res);
          alert('Usuario registrado correctamente');
          this.registerForm.reset();
        },
        error: (err) => {
          console.error('Error al registrarse:', err);
          alert('Error al crear usuario');
        }
      });
    }
  }
}

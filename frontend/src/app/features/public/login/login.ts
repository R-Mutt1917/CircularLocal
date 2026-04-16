import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../../core/services/auth';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm: FormGroup;
  authServices = inject(AuthServices);
  router = inject(Router);
  fb = inject(FormBuilder);
  errorMessage: string = '';

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = '';
      const { username, password } = this.loginForm.value;

      this.authServices.login(username, password).subscribe({
        next: (res) => {
          console.log('Login exitoso', res.role);
          this.loginForm.reset();
          if (this.authServices.role() === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/app']);
          }
        },
        error: (err) => {
          console.error('Error al iniciar sesion:', err);
          this.errorMessage = err.error?.error || 'Credenciales invalidas';
        }
      });
    }
  }

}
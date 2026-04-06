import { Component } from '@angular/core';
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
  loginForm: FormGroup

  constructor(private fb: FormBuilder, private authServices: AuthServices, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;

      this.authServices.login(username, password).subscribe({
        next: (res) => {
          console.log('Login exitoso', res);
          alert('Inicio de sesión correcto');
          this.loginForm.reset();
          this.router.navigate(['/app/publicaciones']);
        },
        error: (err) => {
          console.error('Error al iniciar sesion:', err);
          alert('Credenciales invalidas');
        }
      });
    }
  }

}
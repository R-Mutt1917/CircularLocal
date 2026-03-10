import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServices } from '../../core/services/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
loginForm: FormGroup

  constructor(private fb: FormBuilder, private authServices: AuthServices){
    this.loginForm = this.fb.group({
      username: ['',Validators.required],
      password: ['',[Validators.required, Validators.minLength(8)]]
    });
  }

  onSubmit(){
    if(this.loginForm.valid){
      const {username,password} = this.loginForm.value;

      this.authServices.login(username,password).subscribe({
        next: (res) => {
          console.log('Login exitoso',res);
          localStorage.setItem('authToken', res.token);
          alert('Inicio de sesión correcto');
          this.loginForm.reset();
        },
        error: (err) => {
          console.error('Error al iniciar sesion:',err);
          alert('Credenciales invalidas');
        }
      });
    }
  }

}
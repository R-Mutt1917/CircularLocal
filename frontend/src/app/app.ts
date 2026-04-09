import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterPublic } from './layout/public-layout/footer-public/footer-public';
import { NavAdmin } from './layout/admin-layout/nav-admin/nav-admin';
import { AuthServices } from './core/services/auth';
import { NavUser } from './layout/user-layout/nav-user/nav-user';
import { NavPublic } from './layout/public-layout/nav-public/nav-public';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CommonModule,
    NavUser,
    NavPublic,
    NavAdmin,
    FooterPublic,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Circular Local');

  auth = inject(AuthServices)
  role = this.auth.role;

  constructor() {
    console.log("El rol es: ", this.role())
  }
}

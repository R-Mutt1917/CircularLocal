import { Component, inject } from '@angular/core';
import { AuthServices } from '../../../core/services/auth';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-admin.html',
  styleUrl: './nav-admin.scss',
})
export class NavAdmin {
  authService = inject(AuthServices);
  user = this.authService.userName;
  logout() {
    if (confirm("¿Estas seguro de que quieres cerrar sesion?")) {
      this.authService.logout();
    }
  }
}

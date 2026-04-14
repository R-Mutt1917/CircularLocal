import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../core/services/auth';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-nav-admin',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-admin.html',
  styleUrl: './nav-admin.scss',
})
export class NavAdmin {
  authService = inject(AuthServices);
  sidebarService = inject(SidebarService);
  user = this.authService.userName;
  logout() {
    if (confirm("¿Estas seguro de que quieres cerrar sesion?")) {
      this.authService.logout();
    }
  }
}

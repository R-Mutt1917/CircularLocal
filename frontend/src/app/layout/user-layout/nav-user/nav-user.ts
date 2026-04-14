import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../core/services/auth';
import { SidebarService } from '../../../core/services/sidebar.service';

@Component({
  selector: 'app-nav-user',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-user.html',
  styleUrl: './nav-user.scss',
})
export class NavUser {
  authService = inject(AuthServices);
  sidebarService = inject(SidebarService);
  user = this.authService.userName;
  logout() {
    if (confirm("¿Estas seguro de que quieres cerrar sesion?")) {
      this.authService.logout();
    }
  }
}

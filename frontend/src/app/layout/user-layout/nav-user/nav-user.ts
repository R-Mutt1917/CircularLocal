import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthServices } from '../../../core/services/auth';
import { SidebarService } from '../../../core/services/sidebar.service';
import { Perfil } from '../../../core/services/perfilServices/perfil';

@Component({
  selector: 'app-nav-user',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './nav-user.html',
  styleUrl: './nav-user.scss',
})
export class NavUser implements OnInit {
  authService = inject(AuthServices);
  sidebarService = inject(SidebarService);
  perfilService = inject(Perfil);

  user = this.authService.userName;
  profileImage = signal<string | null>(null);

  ngOnInit(): void {
    const id = this.authService.getId();
    if (id) {
      this.perfilService.getProfile(id).subscribe({
        next: (res) => {
          const imagen = res?.perfil?.imagen ?? res?.imagen ?? null;
          this.profileImage.set(imagen);
        },
        error: () => this.profileImage.set(null),
      });
    }
  }

  logout() {
    if (confirm('¿Estas seguro de que quieres cerrar sesion?')) {
      this.authService.logout();
    }
  }
}

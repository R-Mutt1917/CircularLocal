import { Component } from '@angular/core';
import { HeaderMenu } from './header-menu/header-menu';
import { menuItem } from '../../../shared/models/menu-item.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    HeaderMenu,
    RouterLink,
  ],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  menuItems: menuItem[] = [
    { text: 'Publicaciones', route: '/app/publicaciones' },
    { text: 'Registrarse', route: '/register' },
    { text: 'Iniciar Sesión', route: '/login' },
  ]
}

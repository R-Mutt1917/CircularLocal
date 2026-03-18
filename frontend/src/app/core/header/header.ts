import { Component } from '@angular/core';
import { HeaderMenu } from './header-menu/header-menu';
import { menuItem } from '../model/menu-item.model';
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
    {text: 'Mi Perfil', route:'/perfil'},
    {text: 'Registrarse', route:'/registrarse'},
  ]
}

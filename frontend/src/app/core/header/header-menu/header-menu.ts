import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { menuItem } from '../../model/menu-item.model';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header-menu',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header-menu.html',
  styleUrl: './header-menu.scss',
})
export class HeaderMenu {
  @Input() menuItems?: menuItem[];
}

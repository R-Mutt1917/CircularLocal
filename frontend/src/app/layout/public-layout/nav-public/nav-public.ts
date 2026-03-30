import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav-public',
  imports: [RouterLink],
  templateUrl: './nav-public.html',
  styleUrl: './nav-public.scss',
})
export class NavPublic {
  isMenuOpen = false
}

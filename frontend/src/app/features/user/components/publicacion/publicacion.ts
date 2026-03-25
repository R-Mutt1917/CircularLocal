import { Component, input, OnInit } from '@angular/core';
import { PublicacionModel } from '../../../../shared/models/publicaciones.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-publicacion',
  imports: [RouterLink],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.scss',
})
export class Publicacion implements OnInit {
  publicacion = input.required<PublicacionModel>();

  ngOnInit(): void {

  }
}

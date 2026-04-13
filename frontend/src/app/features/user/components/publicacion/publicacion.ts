import { Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PublicacionPreviewModel } from '../../../../shared/models/publicaciones.model';

@Component({
  selector: 'app-publicacion',
  imports: [RouterLink],
  templateUrl: './publicacion.html',
  styleUrl: './publicacion.scss',
})
export class Publicacion implements OnInit {
  publicacion = input.required<PublicacionPreviewModel>();
  tipo = input<string>();

  ngOnInit(): void {
  }
}

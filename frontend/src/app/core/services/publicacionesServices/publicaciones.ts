import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  consultarPublicaciones() {
    return this.http.get(`${this.apiUrl}/publicaciones`);
  }

}

// POST /publicaciones: Crear una nueva publicación.
// PUT /publicaciones/:id/publicar: Publicar una publicación.
// PUT /publicaciones/:id/finalizar: Finalizar una publicación.
// PUT /publicaciones/:id/cancelar: Cancelar una publicación.
// PUT /publicaciones/:id: Editar una publicación existente (actualizar detalles sin cambiar estado)
// GET /publicaciones: Consultar publicaciones con paginación.
// GET /publicaciones/:id: Consultar el detalle de una publicación.
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrearPublicacionModel, PublicacionModel } from '../../../shared/models/publicaciones.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  //publicaciones por id de usuario con limit opcional
  consultarPublicacionesPorUsuario(id: string, limit?: number): Observable<PublicacionModel[]> {
    const query = limit ? `?limit=${limit}` : '';
    return this.http.get<PublicacionModel[]>(`${this.apiUrl}/publicaciones/user/${id}${query}`);
  }


  //Se necesita endpoint de una previsualizacion de publicacion + perfil de usuario con los siguientes atribututos:
  //PUBLICACION: id, imagenPrincipal, titulo, tag, estado, tipo
  //PERFIL: id, nombre, foto de perfil


  //CUANDO SE CREE NUEVO ENDOPOINT DE PREVISUALIZACION NO USAR MAS ESTE ENDPOINT
  //SE USA PARA MOSTRAR TODAS LAS PUBLICACIONES EN LA SECCION DE user/publicaciones
  consultarPublicaciones(): Observable<PublicacionModel[]> {
    return this.http.get<PublicacionModel[]>(`${this.apiUrl}/publicaciones`);
  }


  crearPublicacion(publicacion: CrearPublicacionModel): Observable<PublicacionModel> {
    return this.http.post<PublicacionModel>(`${this.apiUrl}/publicaciones`, publicacion);
  }

  obtenerPublicacion(id: number): Observable<PublicacionModel> {
    return this.http.get<PublicacionModel>(`${this.apiUrl}/publicaciones/${id}`);
  }

  actualizarPublicacion(id: number, publicacion: CrearPublicacionModel): Observable<PublicacionModel> {
    return this.http.put<PublicacionModel>(`${this.apiUrl}/publicaciones/${id}`, publicacion);
  }

}

// POST /publicaciones: Crear una nueva publicación.
// PUT /publicaciones/:id/publicar: Publicar una publicación.
// PUT /publicaciones/:id/finalizar: Finalizar una publicación.
// PUT /publicaciones/:id/cancelar: Cancelar una publicación.

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { PublicacionModel } from '../../../shared/models/publicaciones.model';
import { CrearPublicacionModel, PublicacionModel } from '../../../shared/models/publicaciones.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  //Se necesita endpoint que traiga publicaciones por id de usuario



  //Se necesita endpoint de una previsualizacion de publicacion + perfil de usuario con los siguientes atribututos:
  //PUBLICACION: id, imagenPrincipal, titulo, tag, estado, tipo
  //PERFIL: id, nombre, foto de perfil


  //CUANDO SE CREE NUEVO ENDOPOINT DE PREVISUALIZACION NO USAR MAS ESTE ENDPOINT
  //SE USA PARA MOSTRAR TODAS LAS PUBLICACIONES EN LA SECCION DE user/publicaciones
  consultarPublicaciones(): Observable<PublicacionModel[]> {
    return this.http.get<PublicacionModel[]>(`${this.apiUrl}/publicaciones`);
  }


  //TRAER TODOS LOS ATRIBUTOS DE PUBLICACION + PERFIL DE USUARIO
  //SE USA PARA MOSTRAR LA PUBLICACION EN LA SECCION DE user/publicacion-detallada
  consultarPublicacionDetallada(id: string): Observable<PublicacionModel> {
    return this.http.get<PublicacionModel>(`${this.apiUrl}/publicaciones/${id}`)
  }

  crearPublicacion(publicacion: CrearPublicacionModel): Observable<PublicacionModel> {
    return this.http.post<PublicacionModel>(`${this.apiUrl}/publicaciones`, publicacion);
  }


  //TRAER TODOS LOS ATRIBUTOS DE PUBLICACION + PERFIL DE USUARIO
  //SE USA PARA MOSTRAR LA PUBLICACION EN LA SECCION DE user/publicacion-detallada
  consultarPublicacionDetallada(id: string): Observable<PublicacionModel> {
    return this.http.get<PublicacionModel>(`${this.apiUrl}/publicaciones/${id}`)
  }


}

// POST /publicaciones: Crear una nueva publicación.
// PUT /publicaciones/:id/publicar: Publicar una publicación.
// PUT /publicaciones/:id/finalizar: Finalizar una publicación.
// PUT /publicaciones/:id/cancelar: Cancelar una publicación.
// PUT /publicaciones/:id/cancelar: Cancelar una publicación.

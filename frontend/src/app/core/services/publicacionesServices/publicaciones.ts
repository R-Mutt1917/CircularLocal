import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrearPublicacionModel, PublicacionDetalleModel, PublicacionModel, PublicacionPreviewModel } from '../../../shared/models/publicaciones.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PublicacionesService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  consultarPublicacionesPorUsuario(id: number, limit?: number): Observable<PublicacionPreviewModel[]> {
    const query = limit ? `?limit=${limit}` : '';
    return this.http.get<PublicacionPreviewModel[]>(`${this.apiUrl}/publicaciones/user/${id}${query}`);
  }

  consultarPublicacionDetalle(id: number): Observable<PublicacionDetalleModel> {
    return this.http.get<PublicacionDetalleModel>(`${this.apiUrl}/publicaciones/perfil/${id}`);
  }


  consultarPublicacionesPreview(): Observable<PublicacionPreviewModel[]> {
    return this.http.get<PublicacionPreviewModel[]>(`${this.apiUrl}/publicaciones/preview`);
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


import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class adminService {

  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

    obtenerUsuarios(page: number = 1, limit: number = 1000){
    return this.httpClient.get<any>(`${this.apiUrl}/admin/usuarios`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  banUser(userID: number){
    return this.httpClient.patch<any>(`${this.apiUrl}/admin/usuarios/${userID}/ban`, {});
  }


  obtenerPublicacionesReportadas(page: number = 1, limit: number = 1000){
    return this.httpClient.get<any>(`${this.apiUrl}/admin/publicaciones/reportadas`, {
      params: { page: page.toString(), limit: limit.toString() }
    });
  }

  cancelarPublicacion(publicacionId: number){
    return this.httpClient.patch<any>(`${this.apiUrl}/admin/publicaciones/${publicacionId}/cancelar`, {});
  }

}

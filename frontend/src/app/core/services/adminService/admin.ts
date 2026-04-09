import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class adminService {

  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);

    obtenerUsuarios(){
    return this.httpClient.get<any>(`${this.apiUrl}/admin/usuarios`);
  }

  banUser(userID: number){
    return this.httpClient.patch<any>(`${this.apiUrl}/admin/usuarios/${userID}/ban`, {});
  }

}

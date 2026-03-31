import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthServices } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class Perfil {
  apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private authService = inject(AuthServices);

  updateUser(id: number, data: any): Observable<any> {

  const token = this.authService.getToken();
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.httpClient.put<any>(`${this.apiUrl}/perfil/${id}`, data, { headers });
}
}

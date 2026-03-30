import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Perfil {
  apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient ) {}

  updateUser(id: number, data: any): Observable<any> {
  // TODO: 'authToken' no existe en localStorage, la clave correcta es 'token'.
  // Reemplazar estas dos líneas por:
  //   private authService = inject(AuthServices); (arriba, en la clase)
  //   const token = this.authService.getToken();
  const token = localStorage.getItem('authToken');
  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`
  });
  return this.httpClient.put<any>(`${this.apiUrl}/perfil/${id}`, data, { headers });
}
}

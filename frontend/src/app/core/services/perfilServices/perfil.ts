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

  getProfile(id: number): Observable<any>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.get<any>(`${this.apiUrl}/perfil/${id}`,{headers});
  }

  updateUser(id: number, data: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.put<any>(`${this.apiUrl}/perfil/${id}`, data, { headers });
  }
}

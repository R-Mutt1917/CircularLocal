import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Perfil {
  private apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  getProfile(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/perfil/${id}`);
  }

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/perfil/${id}`, data);
  }
  
}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Perfil {

  //YA NO SE NECESITA OBTENE EL TOKEN POR IMPLEMENTACION DE INTERCEPTOR en app.config.ts
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  updateUser(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/perfil/${id}`, data);
  }
}
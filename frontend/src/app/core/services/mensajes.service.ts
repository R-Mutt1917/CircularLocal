import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private apiUrl = 'http://localhost:3000/'; // la URL real del backend

  constructor(private http: HttpClient) {}

  getMensajes(conversacionId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/mensajes/${conversacionId}`);
  }

  enviarMensaje(conversacionId: number, mensaje: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/mensajes`, { conversacionId, mensaje, autor: 'yo' });
  }
}
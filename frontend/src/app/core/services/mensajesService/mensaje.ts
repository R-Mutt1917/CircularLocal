import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Conversacion, Mensaje } from '../../../shared/models/mensajes';

@Injectable({
  providedIn: 'root',
})
export class MensajeService {
  apiUrl = environment.apiUrl;
  http = inject(HttpClient);

  obtenerConversaciones(): Observable<Conversacion[]> {
    return this.http.get<Conversacion[]>(`${this.apiUrl}/conversaciones`);
  }

  obtenerMensajes(id:number): Observable<Mensaje[]> {
    return this.http.get<Mensaje[]>(`${this.apiUrl}/conversaciones/${id}/mensajes`);
  }
}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrearSolicitudModel, SolicitudModel } from '../../../shared/models/solicitudes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SolicitudesService {
  apiUrl = environment.apiUrl;

  private http = inject(HttpClient);

  crearSolicitud(solicitud: CrearSolicitudModel): Observable<SolicitudModel> {
    return this.http.post<SolicitudModel>(`${this.apiUrl}/solicitudes`, solicitud);
  }
}

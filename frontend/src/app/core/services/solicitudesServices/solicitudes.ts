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

  // nuevo método para aceptar una solicitud
  aceptarSolicitud(solicitudId: number): Observable<{ conversacionId: number }> {
    return this.http.patch<{ conversacionId: number }>(
      `${this.apiUrl}/solicitudes/${solicitudId}/aceptar`,
      {}
    );
  }

  obtenerSolicitudesPendientes(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.apiUrl}/solicitudes/pendientes`);
  }

  rechazarSolicitud(solicitudId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/solicitudes/${solicitudId}/rechazar`,
      {}
    );
  }
}
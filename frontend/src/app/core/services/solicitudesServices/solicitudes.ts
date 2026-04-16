import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CrearSolicitudModel, SolicitudEnviadaModel, SolicitudModel, SolicitudPendienteModel } from '../../../shared/models/solicitudes.model';
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

  obtenerSolicitudesPendientes(): Observable<SolicitudPendienteModel[]> {
    return this.http.get<SolicitudPendienteModel[]>(`${this.apiUrl}/solicitudes/pendientes`);
}

  aceptarSolicitud(solicitudId: number): Observable<{ conversacionId: number }> {
    return this.http.patch<{ conversacionId: number }>(
      `${this.apiUrl}/solicitudes/${solicitudId}/aceptar`,
      {}
    );
  }

  rechazarSolicitud(solicitudId: number): Observable<void> {
    return this.http.patch<void>(
      `${this.apiUrl}/solicitudes/${solicitudId}/rechazar`,
      {}
    );
  }

  cancelarSolicitud(id: number): Observable<SolicitudModel> {
    return this.http.patch<SolicitudModel>(`${this.apiUrl}/solicitudes/${id}/cancelar`, {});
  }

  solicitudesEnviadas(): Observable<SolicitudEnviadaModel[]> {
    return this.http.get<SolicitudEnviadaModel[]>(`${this.apiUrl}/solicitudes/enviadas`);
  }
}
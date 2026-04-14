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

  solicitudesPendientes(): Observable<SolicitudPendienteModel[]> {
    return this.http.get<SolicitudPendienteModel[]>(`${this.apiUrl}/solicitudes/pendientes`);
  }

  aceptarSolicitud(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/solicitudes/${id}/aceptar`, {});
  }

  rechazarSolicitud(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/solicitudes/${id}/rechazar`, {});
  }

  
 //cancelar las solicitudes q le mando a otro 
  cancelarSolicitud(id: number): Observable<SolicitudModel> {
    return this.http.patch<SolicitudModel>(`${this.apiUrl}/solicitudes/${id}/cancelar`, {});
  }

  solicitudesEnviadas(): Observable<SolicitudEnviadaModel[]> {
    return this.http.get<SolicitudEnviadaModel[]>(`${this.apiUrl}/solicitudes/enviadas`);
  }
}

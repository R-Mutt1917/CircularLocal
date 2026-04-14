import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class IntercambiosServices {
  apiUrl = environment.apiUrl;
  private http = inject(HttpClient);

  intercambiosCompletados(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/intercambios/completados`);
  }
}

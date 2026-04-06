import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthServices } from '../auth';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);
  private authService = inject(AuthServices);


  updateUserProfile(userID: number, userData: any, profileData: any){
    const token = this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = {
      ...userData,
      ...profileData
    }

    return this.httpClient.put<any>(`${this.apiUrl}/usuarios/perfil/${userID}`, body, { headers });    
  }

  deleteUser(userID: number){
    const token =this.authService.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpClient.delete<any>(`${this.apiUrl}/usuarios/${userID}`, { headers });
  }
}

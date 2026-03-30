import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  apiUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  updateUserProfile(userID: number, userData: any, profileData: any){
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    const body = {
      ...userData,
      ...profileData
    }

    return this.httpClient.put<any>(`${this.apiUrl}/usuarios/perfil/${userID}`, body, { headers });    
  }
}

import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserServices {
  private apiUrl = environment.apiUrl;
  private httpClient = inject(HttpClient);


  updateUserProfile(userID: number, userData: any, profileData: any){
    const body = {
      ...userData,
      ...profileData
    }

    return this.httpClient.put<any>(`${this.apiUrl}/usuarios/perfil/${userID}`, body);    
  }

  deleteUser(userID: number){
    return this.httpClient.delete<any>(`${this.apiUrl}/usuarios/${userID}`);
  }
}

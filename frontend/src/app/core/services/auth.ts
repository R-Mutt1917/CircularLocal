import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  apiUrl = environment.apiUrl;
  
  constructor(private httpClient: HttpClient){}

  login(username: string, password: string): Observable<any>{
    return this.httpClient.post<any>(`${this.apiUrl}/login`, { username, password });
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/register`, { username, password });
  }

}
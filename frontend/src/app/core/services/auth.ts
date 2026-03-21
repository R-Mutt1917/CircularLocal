import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServices {
  apiUrl = environment.apiUrl;
  private router = inject(Router)

  readonly role = signal<string | null>(localStorage.getItem('role'));
  readonly isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private httpClient: HttpClient) { }

  //Tuve que cambiarlo para poder guardar en el localstore el token y el rol para usarlo en el auth.guard.ts
  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<{ token: string, role: string, }>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('role', res.role);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.role.set(null);
    this.isLoggedIn.set(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }


  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, { username, password });
  }

}
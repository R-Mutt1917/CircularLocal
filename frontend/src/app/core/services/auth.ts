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
  private httpClient = inject(HttpClient)

  readonly role = signal<string | null>(localStorage.getItem('role'));
  readonly isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));
  readonly userName = signal<string | null>(localStorage.getItem('name'));

  constructor() {
  }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<{ token: { token: string, role: string, id: number, username: string } }>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap((res) => {
        console.log(res)
        localStorage.setItem('token', res.token.token);
        localStorage.setItem('role', res.token.role);
        localStorage.setItem('id', res.token.id.toString());
        localStorage.setItem('name', res.token.username);
        this.role.set(res.token.role);
        this.userName.set(res.token.username);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
    localStorage.removeItem('name');
    this.role.set(null);
    this.isLoggedIn.set(false);
    this.userName.set(null);
    this.router.navigate(['/login']);
  }

  private validateStoredToken(): void {
    if (!this.getToken()) return;
    this.getUser().subscribe();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string | null {
    return localStorage.getItem('role');
  }

  getId(): number {
    return Number(localStorage.getItem('id'));
  }

  getUsername(): string | null {
    return localStorage.getItem('name');
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, { username, password });
  }

  getUser(): Observable<any> {
   return this.httpClient.get<any>(`${this.apiUrl}/auth/profile`);
  }
}
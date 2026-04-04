import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post<{ token: { token: string, role: string, id: number } }>(`${this.apiUrl}/auth/login`, { username, password }).pipe(
      tap((res) => {
        console.log(res)
        localStorage.setItem('token', res.token.token);
        localStorage.setItem('role', res.token.role);
        localStorage.setItem('id', res.token.id.toString());
        this.role.set(res.token.role);
        this.isLoggedIn.set(true);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('id');
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

  getId(): number | null {
    return Number(localStorage.getItem('id'));
  }


  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, { username, password });
  }

  getUser(): Observable<any>{
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.httpClient.get<any>(`${this.apiUrl}/auth/profile`,{headers});
  }

}
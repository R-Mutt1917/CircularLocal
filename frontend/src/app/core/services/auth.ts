import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
interface JwtPayload {
  id: number;
  username: string;
  role?: string;
  exp: number;
  iat: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthServices {

  apiUrl = environment.apiUrl;
  private router = inject(Router);

  readonly role = signal<string | null>(localStorage.getItem('role'));
  readonly isLoggedIn = signal<boolean>(!!localStorage.getItem('token'));

  constructor(private httpClient: HttpClient) {}

  login(username: string, password: string): Observable<any> {

    return this.httpClient
      .post<{ token: string }>(`${this.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((res) => {
          console.log('Login response:', res);

          const token = res.token;

          const decoded = jwtDecode<JwtPayload>(token);

          localStorage.setItem('token', token);
          localStorage.setItem('id', decoded.id.toString());

          if (decoded.role) {
            localStorage.setItem('role', decoded.role);
            this.role.set(decoded.role);
          }

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
    const id = localStorage.getItem('id');
    return id ? Number(id) : null;
  }

  register(username: string, password: string): Observable<any> {
    return this.httpClient.post<any>(
      `${this.apiUrl}/auth/register`,
      { username, password }
    );
  }

  getUser(): Observable<any> {

    const token = this.getToken();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<any>(
      `${this.apiUrl}/auth/profile`,
      { headers }
    );
  }
}
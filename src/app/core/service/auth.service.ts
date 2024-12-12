import { Injectable } from '@angular/core';
import { LoginCredentials, Register } from '../model/auth';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../model/constant';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = `${API_URL_BASE}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: LoginCredentials): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((response: any) => {
        localStorage.setItem('authToken', response.accessToken);
        console.log(response);
        return response;
      }),
      catchError(() => of(false))
    );
  }

  loadUserData(userId: number): Observable<any> {
    return this.http.get(`${API_URL_BASE}/user/${userId}`);
  }


  register(user: Register): Observable<boolean> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }
}

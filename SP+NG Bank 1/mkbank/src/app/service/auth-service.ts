import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { isPlatformBrowser } from '@angular/common';
import { AuthResponse } from '../model/authResponse.model';
import { environment } from '../environment/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.springUrl;



  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  private userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  public userRole$: Observable<string | null> = this.userRoleSubject.asObservable();


  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  login(email: string, password: string): Observable<AuthResponse> {

    return this.http.post<AuthResponse>(this.baseUrl + '/user/login', { email, password }, { headers: this.headers }).pipe(

      map(
        (response: AuthResponse) => {
          if (this.isBrowser() && response.token) {
            localStorage.setItem('authToken', response.token);
            console.log(response.token+"1111111111111111111111111111111111");
            console.log(localStorage.getItem('authToken')+"2222222222222222222222222222222222");

            const decodeToken = this.decodeToken(response.token);
            localStorage.setItem('userRole', decodeToken.role);
            this.userRoleSubject.next(decodeToken.role);
          }
          return response;

        }

      )
    );
  }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }


  decodeToken(token: string) {

    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));

  }

  getToken(): string | null {

    if (this.isBrowser()) {
      return localStorage.getItem('authToken');
    }
    return null;

  }


  getUserRole(): string | null {

    if (this.isBrowser()) {
      return localStorage.getItem('userRole');
    }
    return null;

  }

  isTokenExpired(token: string): boolean {
    const docodeToken = this.decodeToken(token);

    const expiry = docodeToken.exp * 1000;
    return Date.now() > expiry;
  }

  isLoggIn(): boolean {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      return true;
    }
    this.logout();
    return false;

  }


  logout(): void {
    if (this.isBrowser()) {
      alert('You have been logged out successfully!');
      localStorage.removeItem('userRole');
      localStorage.removeItem('authToken');
      this.userRoleSubject.next(null);
    }
    this.router.navigate(['/login']);
  }


  hasRole(roles: string[]): boolean {

    const userRole = this.getUserRole();
    return userRole ? roles.includes(userRole) : false;

  }

   isJobSeeker(): boolean {
    return this.getUserRole() === 'JOBSEEKER';
  }

  






}

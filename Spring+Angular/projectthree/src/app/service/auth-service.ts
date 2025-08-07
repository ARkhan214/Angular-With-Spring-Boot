import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthResponse } from '../model/authResponse';
import { response } from 'express';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    
  private baseUrl = environment.apiBaseUrl+'/user/';

  private headers= new HttpHeaders({'Content-Type': 'application/json'});
  
  private  userRoleSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  private userRole$: Observable<string | null> = this.userRoleSubject.asObservable();

  constructor(
    private http:HttpClient,
    private router:Router,
    @Inject(PLATFORM_ID) private platformId:object
  ){ }


  login(email:string,password:string):Observable<AuthResponse>{

    return this.http.post<AuthResponse>(this.baseUrl+'login',{email,password},{headers:this.headers}).pipe(
      map(
        (response:AuthResponse)=>{
          if(this.isBrowser() && response.token){

          localStorage.setItem('authToken',response.token);
          const decodeToken = this.decodeToken(response.token);
          localStorage.setItem('userRole',decodeToken.role);
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


}

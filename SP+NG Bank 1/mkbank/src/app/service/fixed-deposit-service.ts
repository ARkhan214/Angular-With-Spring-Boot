import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { FixedDeposit } from '../model/fixedDeposit.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FixedDepositService {

  private baseUrl = 'http://localhost:8085/api/fd/create'  // backend API base

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }


  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }


  createFD(fd: FixedDeposit): Observable<FixedDeposit> {
    const token = this.getToken();
    const headers = new HttpHeaders({

      Authorization: `Bearer ${token}`
    });

    return this.http.post<FixedDeposit>(`${this.baseUrl}`, fd, { headers });
  }


}

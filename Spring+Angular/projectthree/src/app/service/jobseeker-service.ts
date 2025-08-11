import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobSeeker } from '../model/jobSeeker.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {

  private baseUrl = environment.apiBaseUrl + '/jobseeker/';

  constructor(
    private http: HttpClient,
     @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  registerJobSeeker(user: any, jobseeker: any, photo: File): Observable<any> {
    const formData  = new FormData;

    formData.append('user', JSON.stringify(user));
    formData.append('jobSeeker', JSON.stringify(jobseeker));
    formData.append('photo', photo);

    return this.http.post(this.baseUrl, formData);

  }

  getProfile(): Observable<JobSeeker> {

    let headers = new HttpHeaders();
    if(isPlatformBrowser(this.platformId)){
       const token = localStorage.getItem('authToken');    

    if (token) {
      headers = headers.set('Authorization', 'Bearer ' + token);
    }

  }else {
      console.warn('localStorage not available outside browser');
    }
   

    return this.http.get<JobSeeker>(`${this.baseUrl}profile`, { headers });

  }



}

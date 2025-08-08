import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobSeeker } from '../model/jobSeeker.model';

@Injectable({
  providedIn: 'root'
})
export class JobseekerService {
  
private baseUrl = environment.apiBaseUrl+'/jobseeker/';

constructor(
  private http:HttpClient
){}

registerJobSeeker(user:any,jobseeker:any,photo:File):Observable<any>{
const fofmData = new FormData;

fofmData.append('user',JSON.stringify(user));
fofmData.append('jobSeeker',JSON.stringify(jobseeker));
fofmData.append('photo',photo);

return this.http.post(this.baseUrl,fofmData);

}

getProfile(): Observable<JobSeeker> {
  const token = localStorage.getItem('authToken');
  let headers = new HttpHeaders();

  if(token){
    headers = headers.set('Authorization','Bearer ' + token);
  }

  return this.http.get<JobSeeker>(`${this.baseUrl}profile`,{headers});

}



}

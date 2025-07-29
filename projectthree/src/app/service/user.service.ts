import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
private baseUrl = environment.apiBaseUrl+'/user/';


constructor(
  private http : HttpClient
){}

getAllUser():Observable<User[]>{
  return this.http.get<User[]>(this.baseUrl);
}

getUserById(id: number): Observable<User> {
  return this.http.get<User>(`${this.baseUrl}${id}`);
}

deleteUserById(id: number): Observable<any> {
  return this.http.delete(`${this.baseUrl}${id}`);
}



}

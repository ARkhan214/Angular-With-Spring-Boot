import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../model/user.model';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl=environment.springUrl+"user/";

  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser$: Observable<User | null>;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {

    const storedUser = this.isBrowser() ? JSON.parse(localStorage.getItem('loggedInUser') || 'null') : null;
    this.currentUserSubject = new BehaviorSubject<User | null>(storedUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }


  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  // Set user after login
  setLoginUser(user: User): void {
    if (this.isBrowser()) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.currentUserSubject.next(user); //update observable
    }
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('loggedInUser');
      this.currentUserSubject.next(null); // update observable
    }
  }

  getLoginUser(): User | null {
    return this.currentUserSubject.value;
  }

  getLoginUserRole(): string | null {
    const user = this.currentUserSubject.value;
    return user ? user.type : null;
  }


  //for admin dashbord
  getAllUser(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl);
  }

  saveAllUser(alluser: User): Observable<any> {
    return this.http.post(this.baseUrl, alluser);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/' + id);
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }


  updateUser(id: number, user: User): Observable<any> {
    return this.http.put(this.baseUrl + '/' + id, user);
  }

    //for admin dashbord
  getAllUsers() {
    return this.http.get<User[]>('http://localhost:3000/user');
  }

 registerUser(formData: FormData): Observable<any> {
  return this.http.post(this.baseUrl, formData);
}


}

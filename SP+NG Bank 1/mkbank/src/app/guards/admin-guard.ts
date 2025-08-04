import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      const user = JSON.parse(data);
      if (user.type === 'admin') {
        console.log('Admin access granted');
        return true;
      }
    }

    console.warn('Admin access denied');
    this.router.navigate(['/login']);
    return false;
  }
}

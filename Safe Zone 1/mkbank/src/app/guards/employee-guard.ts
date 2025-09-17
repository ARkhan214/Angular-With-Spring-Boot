import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';

import { Observable } from 'rxjs';

export class EmployeeGuard implements CanActivate {

   constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(): boolean | UrlTree | Observable<boolean | UrlTree> {
    console.log('Checking EmployeeGuard. Current Role:', this.authService.getUserRole());

    if (this.authService.isEmployee()) {
      return true;
    }

    return this.router.createUrlTree(['/login']);
  }

};

import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';

export class userAdminEmployeeGuard implements CanActivate{

   constructor(
    private authService: AuthService,
     private router: Router) {}

  canActivate(): boolean | UrlTree {
    console.log('Checking UserAdminEmployeeGuard. Current Role:', this.authService.getUserRole());

    if (this.authService.isUser() || this.authService.isAdmin() || this.authService.isEmployee()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }


};

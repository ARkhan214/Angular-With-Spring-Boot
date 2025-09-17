import { CanActivate, CanActivateFn, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';

export class userAdminGuard implements CanActivate {

  constructor(
    private authService: AuthService,
     private router: Router
    ) { }

  canActivate(): boolean | UrlTree {
    console.log('Checking UserAdminGuard. Current Role:', this.authService.getUserRole());

    if (this.authService.isUser() || this.authService.isAdmin()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }

};

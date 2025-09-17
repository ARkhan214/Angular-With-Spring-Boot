import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../service/auth-service';

export class userEmployeeGuard implements CanActivate {
  
constructor(
  private authService: AuthService,
   private router: Router
  ) {}

  canActivate(): boolean | UrlTree {
    console.log('Checking UserEmployeeGuard. Current Role:', this.authService.getUserRole());

    if (this.authService.isUser() || this.authService.isEmployee()) {
      return true;
    }
    return this.router.createUrlTree(['/login']);
  }
  
};

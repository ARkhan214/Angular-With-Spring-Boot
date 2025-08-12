import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  // onSubmitLogin() {
  //   this.userService.getAllUser().subscribe(users => {
  //     const foundUser = users.find((u: User) =>
  //       u.email === this.email && u.password === this.password
  //     );

  //     if (foundUser) {
  //       // local storage a user set korlam
  //       localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
  //       this.userService.getLoginUser();

  //       // user type and rauting
  //       if (foundUser.type === 'admin') {
  //         this.router.navigate(['/admin-profile']);
  //       } else {
  //         this.router.navigate(['/user-profile']);
  //       }
  //     } else {
  //       this.errorMessage = 'Invalid email or password';
  //     }
  //   });
  // }


  onSubmitLogin() {
    this.userService.getAllUser().subscribe(users => {
      const foundUser = users.find((u: User) =>
        u.email === this.email && u.password === this.password
      );

      if (foundUser) {
        // ✅ Set user in service (and localStorage)
        this.userService.setLoginUser(foundUser);

        // ✅ Navigate based on role
        if (foundUser.type === 'admin') {
          this.router.navigate(['/admin-profile']);
        } else {
          this.router.navigate(['/user-profile']);
        }
      } else {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }





}

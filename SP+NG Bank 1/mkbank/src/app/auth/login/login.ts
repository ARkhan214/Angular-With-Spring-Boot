import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user.model';
import { AuthResponse } from '../../model/authResponse.model';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

user: Partial<User> = {
    email: '',
    password: ''
  };

  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private userService: UserService,
     private router: Router,
     private authService:AuthService
    ) {}

onSubmit() {
  this.userService.login(this.user as User).subscribe({
    next: (response: AuthResponse) => {
      console.log("Login successful:", response);

      //Save Token in localStorage
      localStorage.setItem('authToken', response.token);

      this.successMessage = response.message;
      this.errorMessage = '';

      // Find role by decode JWT Token
      const payload = JSON.parse(atob(response.token.split('.')[1]));
      const role = payload.role;
      const accountId = payload.id;
      console.log("Account id "+accountId);

      // Redirect By Role
      if(role === 'ADMIN') {
        this.router.navigate(['/admin-profile']);
      } else if(role === 'EMPLOYEE') {
        this.router.navigate(['/employee-profile']);
      } else if(role === 'USER') {
        this.router.navigate(['/account-profile']);

      } else {
        this.router.navigate(['/']);
      }
    },
    error: (err) => {
      console.error("Login failed:", err);
      this.errorMessage = "Invalid email or password!";
      this.successMessage = '';
    }
  });
}





  // onSubmit() {
  //   this.userService.login(this.user as User).subscribe({
  //     next: (response: AuthResponse) => {
  //       console.log("Login successful:", response);

        
  //       localStorage.setItem('token', response.token);

  //       this.successMessage = response.message;
  //       this.errorMessage = '';

       
  //       this.router.navigate(['/user-profile']);
  //     },
  //     error: (err) => {
  //       console.error("Login failed:", err);
  //       this.errorMessage = "Invalid email or password!";
  //       this.successMessage = '';
  //     }
  //   });
  // }



// user: User ={
//   email: '',
//   password: ''
 
 
// }

//   errorMessage: string = '';
//   successMessage: string = '';

//   constructor(
//     private userService: UserService,
//     private router: Router
//   ) { }

//   // onSubmitLogin() {
//   //   this.userService.getAllUser().subscribe(users => {
//   //     const foundUser = users.find((u: User) =>
//   //       u.email === this.email && u.password === this.password
//   //     );

//   //     if (foundUser) {
//   //       // local storage a user set korlam
//   //       localStorage.setItem('loggedInUser', JSON.stringify(foundUser));
//   //       this.userService.getLoginUser();

//   //       // user type and rauting
//   //       if (foundUser.type === 'admin') {
//   //         this.router.navigate(['/admin-profile']);
//   //       } else {
//   //         this.router.navigate(['/user-profile']);
//   //       }
//   //     } else {
//   //       this.errorMessage = 'Invalid email or password';
//   //     }
//   //   });
//   // }


//   onSubmit() {
//     this.userService.login(this.user).subscribe({
//       next: (response: AuthResponse) => {
//         console.log("Login success:", response);

//         // JWT Token localStorage এ save করো
//         localStorage.setItem('token', response.token);

//         this.successMessage = response.message;
//         this.errorMessage = '';

//         // login successful হলে অন্য page এ পাঠাতে পারো
//         this.router.navigate(['/dashboard']);
//       },
//       error: (err) => {
//         console.error("Login failed:", err);
//         this.errorMessage = "Invalid credentials!";
//         this.successMessage = '';
//       }
//     });
//   }





}
